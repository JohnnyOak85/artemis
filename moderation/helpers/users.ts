import { Api } from '../../commons/tools';

const URL = 'moderation/users';

type User = {
    id?: string;
    nickname: string;
    roles: string[];
    warnings?: string[];
};

export const getUser = async (userId: string) => Api.get<User>(`${URL}/${userId}`);
export const putUser = async (user: User) => Api.put<User>(URL, user);
