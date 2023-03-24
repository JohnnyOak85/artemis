import { get, getVariables } from '../../shared';

const URL = 'speech';

export const getData = async <T>(suffix: string) => {
    try {
        const { api } = getVariables();
        const { data } = await get<T>({ url: `${api}/${URL}/${suffix}` });

        return data;
    } catch (error) {
        throw error;
    }
};
