import { CommandInteraction, getData, logError, logInfo, putData } from '../../shared';

const URL = 'moderation/users';

type User = {
    id?: string;
    nickname: string;
    roles: string[];
    warnings?: string[];
};

export const warnUser = async (
    { guild, options }: CommandInteraction,
    userId: string,
    reasonId: string
) => {
    try {
        const infractor = options.getUser(userId);
        const reasonData = options.get(reasonId);
        const reason = (reasonData?.value as string) || 'No reason provided';

        if (!infractor) {
            return 'You need to give me a user to warn.';
        }

        `${URL}/${infractor.id}`;
        const user = await getData<User>(`${URL}/${infractor.id}`);

        user.id = infractor.id;
        user.warnings ??= [];
        user.warnings.push(reason);

        await putData<User>(URL, user.id!, user);

        const reply = `${infractor?.username} as been warned. Reason: ${reason}`;

        guild?.systemChannel?.send(reply);

        logInfo('moderation', `Warned user ${user.nickname}`);
        return reply;
    } catch (error) {
        logError(error, 'moderation/warnUser');
        return 'There was an error executing the command!';
    }
};
