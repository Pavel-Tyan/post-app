import { useQuery } from '@tanstack/react-query';
import publicationService from '../api/services/publication.service';

export const useAllPublications = () => {
    return useQuery({
        queryKey: ['publications'],
        queryFn: async () => {
            const jwt = localStorage.getItem('jwt');

            if (!jwt) {
                return;
            }

            return await publicationService.getAllPublications(jwt);
        },
    });
};
