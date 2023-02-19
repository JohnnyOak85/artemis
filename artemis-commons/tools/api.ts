import Axios from 'axios';
import { Agent } from 'https';
import environment from './environment';
import log from './log';

const httpsAgent = new Agent({ rejectUnauthorized: false });

const createClient = (baseURL: string) => Axios.create({ baseURL, httpsAgent });

export default {
    get: async <T>(url: string) => {
        try {
            const { api } = environment.get();
            const { get } = createClient(api);
            const { data } = await get(`/${url}`);

            return data as T;
        } catch (error) {
            log.error(error, `get/${url}`);
            throw error;
        }
    },
    put: async <T>(url: string, data: T) => {
        try {
            const { api } = environment.get();
            const { put } = createClient(api);

            await put(url, data);
        } catch (error) {
            log.error(error, `get/${url}`);
            throw error;
        }
    }
};
