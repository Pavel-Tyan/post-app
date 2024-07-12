import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CommentDto, CreateCommentDto } from '../api/@types/api';
import userService from '../api/services/user.service';
import commentService from '../api/services/comment.service';

export const useCreateComment = () => {
    return useMutation({
        mutationFn: async ({ text, publicationId }: CreateCommentDto) => {
            const jwt = localStorage.getItem('jwt');

            if (!jwt) {
                return;
            }

            const user = await userService.getUserByToken(jwt);

            if (!user) {
                return;
            }

            const commentDto: CommentDto = {
                text: text,
                userId: user._id,
                publicationId: publicationId,
            };

            return await commentService.postComment({
                params: commentDto,
                config: {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                },
            });
        },
        onSuccess: async (data, variables) => {
            console.log('Successfully created comment');
            console.log(data);
            console.log(variables);
        },
        onError: async (error, variables) => {
            console.log('Error while creating comment');
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            }
            console.log(variables);
        },
        onMutate: async (variables) => {
            console.log('Start creating publication');
            console.log(variables);
        },
    });
};
