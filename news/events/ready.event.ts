import {
    getVariables,
    getChannel,
    Events,
    Client,
    runDailyJob,
    logError,
    logInfo
} from '../../shared';
import { getNews } from '../helpers';

export const ReadyEvent = {
    name: Events.ClientReady,
    execute: async ({ guilds }: Client<true>) => {
        const { guild: guildId } = getVariables();

        runDailyJob(async () => {
            try {
                logInfo('news', 'sendingGamingNews');

                const guild = await guilds.fetch(guildId);
                const channel = await getChannel(guild, '1005121368066621560');

                channel?.send({
                    content: `Here's today's gaming news!`,
                    ...(await getNews('gaming'))
                });
            } catch (error) {
                logError(error, 'news/sendingGamingNews');
            }
        });
    }
};
