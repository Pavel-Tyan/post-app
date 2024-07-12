import { useMutation } from '@tanstack/react-query';
import userService from '../api/services/user.service';
import { Publication } from '../api/@types/api';
import { AxiosError } from 'axios';

export const usePublicationAuthor = () => {
    return useMutation({
        mutationFn: async (publication: Publication) => {
            const authorId = publication.userId;
            return await userService.getUserById(authorId);
        },
        onSuccess: async (data, variables) => {
            console.log('Successfully got publication author');
            console.log(data);
            console.log(variables);
        },
        onError: async (error, variables) => {
            console.log('Error while getting publication author');
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            }
            console.log(variables);
        },
    });
};
