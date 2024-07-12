import { useMutation } from '@tanstack/react-query';
import userService from '../api/services/user.service';
import { AxiosError } from 'axios';
import { UpdateDataUser, UserDto } from '../api/@types/api';

export const useUpdateUserData = () => {
    return useMutation({
        mutationFn: async (userData: UpdateDataUser) => {
            let jwt = localStorage.getItem('jwt');
            const res = (await userService.getUserByToken(jwt)) as UserDto;

            if (res) {
                const loginResponce = await userService.loginUser({
                    params: {
                        email: res.email,
                        password: userData.user.password,
                    },
                });

                if (loginResponce) {
                    localStorage.setItem('jwt', loginResponce.access_token);
                    jwt = localStorage.getItem('jwt');

                    return await userService.updateUser(
                        {
                            params: userData.user,
                            config: {
                                headers: { Authorization: `Bearer ${jwt}` },
                            },
                        },
                        userData.id
                    );
                }
            }

            return;
        },
        onSuccess: async (variables) => {
            console.log('Successfully update personal data');
            console.log(variables);
        },
        onError: async (error) => {
            console.log('Error while updating personal data');
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            }
        },
    });
};
