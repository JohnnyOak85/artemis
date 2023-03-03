import Axios from 'axios';
import { Agent } from 'https';
import { Dictionary } from '..';
import environment from './environment';
import log from './log';

const httpsAgent = new Agent({ rejectUnauthorized: false });

const createClient = (baseURL: string) => Axios.create({ baseURL, httpsAgent });

export default {
    get: async <T>(url: string, params?: Dictionary<string>) => {
        try {
            const { api } = environment.get();
            const { get } = createClient(api);
            const { data } = await get(`/${url}`, { params });

            return data as T;
        } catch (error) {
            if (Axios.isAxiosError(error)) {
                log.error(error.response?.data, `get/${url}`);
                throw error.response?.data;
            }

            log.error(error, `get/${url}`);
            throw error;
        }
    },
    put: async <T>(url: string, payload?: T) => {
        try {
            const { api } = environment.get();
            const { put } = createClient(api);
            const { data } = await put(url, payload);

            return data;
        } catch (error) {
            log.error(error, `get/${url}`);
            throw error;
        }
    }
};
