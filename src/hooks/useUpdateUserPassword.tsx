import { useMutation } from '@tanstack/react-query';
import userService from '../api/services/user.service';
import { AxiosError } from 'axios';
import { UpdatePasswordUser, UserDto } from '../api/@types/api';

export const useUpdateUserPassword = () => {
    return useMutation({
        mutationFn: async (userData: UpdatePasswordUser) => {
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

                    const updatedUserDto: UserDto = {
                        surname: res.surname,
                        name: res.name,
                        email: res.email,
                        password: userData.newPassword,
                    };

                    return await userService.updateUser(
                        {
                            params: updatedUserDto,
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
            console.log('Successfully update password');
            console.log(variables);
        },
        onError: async (error) => {
            console.log('Error while updating password');
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            }
        },
    });
};
