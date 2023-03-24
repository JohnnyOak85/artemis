import { DiscordCommandInteraction } from '../../commons/discord';
import { Log } from '../../commons/tools';
import { getUser, putUser } from './users';

export const warnUser = async (
    { guild, options }: DiscordCommandInteraction,
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

        const user = await getUser(infractor.id);

        user.id = infractor.id;
        user.warnings ??= [];
        user.warnings.push(reason);

        await putUser(user);

        const reply = `${infractor?.username} as been warned. Reason: ${reason}`;

        guild?.systemChannel?.send(reply);

        return reply;
    } catch (error) {
        Log.error(error, 'warnUser');
        return 'There was an error executing the command!';
    }
};
