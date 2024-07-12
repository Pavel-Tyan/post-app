import { useQuery } from '@tanstack/react-query';
import userService from '../api/services/user.service';

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const jwt = localStorage.getItem('jwt');
            return await userService.getUserByToken(jwt);
        },
    });
};
