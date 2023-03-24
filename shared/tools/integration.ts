import Axios, { AxiosRequestConfig } from 'axios';
import { Dictionary } from '..';

interface RequestOptions extends AxiosRequestConfig {
    data?: any;
    headers?: Dictionary<string>;
    url: string;
}

const client = Axios.create();

export const get = <T>({ url, ...options }: RequestOptions) => client.get<T>(url, options);
export const put = <T>({ url, data }: RequestOptions) => client.put<T>(url, data);
