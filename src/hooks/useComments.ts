import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import commentService from '../api/services/comment.service';

export const useComments = () => {
    return useMutation({
        mutationFn: async (publicationId: string) => {
            const jwt = localStorage.getItem('jwt');

            if (!jwt) {
                return;
            }

            return await commentService.getAllByPublicationId(jwt, publicationId);
        },
        onSuccess: async (data, variables) => {
            console.log('Successfully got comments');
            console.log(data);
            console.log(variables);
        },
        onError: async (error, variables) => {
            console.log('Error while getting comments');
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            }
            console.log(variables);
        },
    });
};
