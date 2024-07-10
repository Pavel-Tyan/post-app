import { useMutation } from '@tanstack/react-query';
import userService from '../api/services/user.service';
import { AxiosError } from 'axios';

export const useRegister = () => {
    return useMutation({
        mutationFn: (newUser: UserDto) =>
            userService.postUser({
                params: newUser,
            }),
        onSuccess: async (data, variables) => {
            console.log('Successfully registered');
            console.log(data);
            console.log(variables);
        },
        onError: async (error, variables) => {
            console.log('Error while registering');
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            }
            console.log(variables);
        },
    });
};
