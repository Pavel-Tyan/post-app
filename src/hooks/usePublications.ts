import { useMutation } from '@tanstack/react-query';
import publicationService from '../api/services/publication.service';
import { AxiosError } from 'axios';

export const usePublications = () => {
    return useMutation({
        mutationFn: async (category: string) => {
            const jwt = localStorage.getItem('jwt');

            if (!jwt) {
                return;
            }

            const publications = await publicationService.getAllPublications(jwt);

            if (category === '') {
                return publications;
            }

            return publications.filter(
                (publication) => publication.category.toLowerCase() === category.toLowerCase()
            );
        },
        onSuccess: async (data, variables) => {
            console.log('Successfully got publications by category');
            console.log(data);
            console.log(variables);
        },
        onError: async (error, variables) => {
            console.log('Error while getting publications by category');
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            }
            console.log(variables);
        },
    });
};
