import { UserDto } from '../@types/api';
import { api } from '../instance';

class UserService {
    private readonly PREFIX = 'auth';

    async postUser({ params, config }: AxiosRequestConfig<UserDto>) {
        const res = await api.post(this.PREFIX + '/register', params, config);
        return res.data;
    }

    async updateUser({ params, config }: AxiosRequestConfig<UserDto>, id: string) {
        const res = await api.patch(this.PREFIX + '/' + id, params, config);
        return res.data;
    }

    async loginUser({ params, config }: AxiosRequestConfig<Pick<UserDto, 'email' | 'password'>>) {
        const res = await api.post(this.PREFIX + '/login', params, config);
        return res.data;
    }

    async getUserByToken(token: string | null) {
        if (!token) {
            return null;
        }

        const res = await api.get(this.PREFIX + '/' + token);
        return res.data;
    }

    async getUserById(id: string) {
        const res = await api.get(this.PREFIX + '/byId/' + id);
        return res.data;
    }
}

export default new UserService();
