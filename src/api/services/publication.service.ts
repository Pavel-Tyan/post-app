import { PublicationDto } from '../@types/api';
import { api } from '../instance';

class PublicationService {
    private readonly PREFIX = 'publication';

    async getAllPublications(jwt: string) {
        const res = await api.get(this.PREFIX + '/findAll', {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        return res.data;
    }

    async getPublication(jwt: string, id: string) {
        const res = await api.get(this.PREFIX + '/findByUserId' + '/' + id, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        return res.data;
    }
    async postPublication({ params, config }: AxiosRequestConfig<PublicationDto>) {
        const res = await api.post(this.PREFIX + '/create', params, config);
        return res.data;
    }

    async updatePublication({ params, config }: AxiosRequestConfig<PublicationDto>, id: string) {
        const res = await api.patch(this.PREFIX + '/' + id, params, config);
        return res.data;
    }

    async deletePublication(id: string) {
        const res = await api.delete(this.PREFIX + '/' + id);
        return res.data;
    }
}

export default new PublicationService();
