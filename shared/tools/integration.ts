import Axios, { AxiosRequestConfig } from 'axios';
import { Dictionary, getVariables } from '..';
import { Agent } from 'https';

interface RequestOptions extends AxiosRequestConfig {
    data?: any;
    headers?: Dictionary<string>;
    url: string;
}

// TODO This is insecure
const httpsAgent = new Agent({ rejectUnauthorized: false });

const client = Axios.create({ httpsAgent });

export const get = <T>({ url, ...options }: RequestOptions) => client.get<T>(url, options);
export const put = <T>({ url, data }: RequestOptions) => client.put<T>(url, data);

export const getData = async <T>(suffix: string) => {
    try {
        const { api } = getVariables();
        const { data } = await get<T>({ url: `${api}/${suffix}` });

        return data;
    } catch (error) {
        throw error;
    }
};

export const putData = async <T>(suffix: string, id: string, value: any) => {
    try {
        const { api } = getVariables();
        const { data } = await put<T>({
            url: `${api}/${suffix}`,
            data: { id, value }
        });

        return data;
    } catch (error) {
        throw error;
    }
};
