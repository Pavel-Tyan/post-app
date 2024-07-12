import { useMutation } from '@tanstack/react-query';
import userService from '../api/services/user.service';
import { AxiosError } from 'axios';
import { UserDto } from '../api/@types/api';

export const useLogin = () => {
    return useMutation({
        mutationFn: (newUser: Pick<UserDto, 'email' | 'password'>) =>
            userService.loginUser({
                params: newUser,
            }),
        onSuccess: async (data, variables) => {
            console.log('Successfully logged in');
            localStorage.setItem('jwt', data.access_token);
            console.log(data);
            console.log(variables);
        },
        onError: async (error, variables) => {
            console.log('Error while logging in');
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            }
            console.log(variables);
        },
    });
};
