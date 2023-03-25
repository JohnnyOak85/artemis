import Axios, { AxiosRequestConfig } from 'axios';
import { Dictionary, getVariables } from '..';
import { Agent } from 'https';

interface RequestOptions extends AxiosRequestConfig {
    data?: any;
    headers?: Dictionary<string>;
    url: string;
}

const client = Axios.create();

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
