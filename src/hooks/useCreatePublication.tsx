import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CreatePublicationDto, PublicationDto } from '../api/@types/api';
import publicationService from '../api/services/publication.service';
import userService from '../api/services/user.service';

export const useCreatePublication = () => {
    return useMutation({
        mutationFn: async (newPublication: CreatePublicationDto) => {
            const jwt = localStorage.getItem('jwt');

            if (!jwt) {
                return;
            }

            const user = await userService.getUserByToken(jwt);

            if (!user) {
                return;
            }

            const publicationDto: PublicationDto = {
                title: newPublication.title,
                category: newPublication.category,
                text: newPublication.text,
                userId: user._id,
            };

            return await publicationService.postPublication({
                params: publicationDto,
                config: {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                },
            });
        },
        onSuccess: async (data, variables) => {
            console.log('Successfully created publication');
            console.log(data);
            console.log(variables);
        },
        onError: async (error, variables) => {
            console.log('Error while creating publication');
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
