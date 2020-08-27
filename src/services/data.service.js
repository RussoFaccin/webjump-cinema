import { api, API_KEY } from '../api/api';

export class DataService {
    async getMovie(urlKey) {
        const movieList = await api.get(`/${urlKey}`, {
            params: {
                api_key: API_KEY
            }
        });

        return movieList;
    }
}