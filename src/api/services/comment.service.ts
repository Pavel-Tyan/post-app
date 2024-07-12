import { CommentDto } from '../@types/api';
import { api } from '../instance';

class CommentService {
    private readonly PREFIX = 'comment';

    async getAllByPublicationId(jwt: string, id: string) {
        const res = await api.get(this.PREFIX + '/byPublication/' + id, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        return res.data;
    }

    async postPublication({ params, config }: AxiosRequestConfig<CommentDto>) {
        const res = await api.post(this.PREFIX + '/create', params, config);
        return res.data;
    }
}

export default new CommentService();
