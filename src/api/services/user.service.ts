import { api } from '../instance';

class UserService {
    private readonly PREFIX = 'auth';

    async postUser({ params, config }: AxiosRequestConfig<UserDto>) {
        const res = await api.post(this.PREFIX + '/register', params, config);
        return res.data;
    }

    async loginUser({ params, config }: AxiosRequestConfig<Pick<UserDto, 'email' | 'password'>>) {
        const res = await api.post(this.PREFIX + '/login', params, config);
        return res.data;
    }

    async getUserByToken(token: string) {
        const res = await api.get(this.PREFIX + '/user/' + token);
        return res.data;
    }
}

export default new UserService();
