import Axios from 'axios';
import { Agent } from 'https';
import { Dictionary } from '..';
import environment from './environment';

const httpsAgent = new Agent({ rejectUnauthorized: false });

const createClient = (baseURL: string) => Axios.create({ baseURL, httpsAgent });

export default {
    get: async <T>(url: string, params?: Dictionary<string>) => {
        try {
            const { api } = environment.get();
            const { get } = createClient(api);
            const { data } = await get<T>(`/${url}`, { params });

            return data;
        } catch (error) {
            throw error;
        }
    },
    put: async <T>(url: string, payload?: T) => {
        try {
            const { api } = environment.get();
            const { put } = createClient(api);
            const { data } = await put<T>(url, payload);

            return data;
        } catch (error) {
            throw error;
        }
    }
};
