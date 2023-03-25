import {
    Client,
    Events,
    getChannel,
    getVariables,
    logError,
    logInfo,
    runWeeklyJob
} from '../../shared';
import { getQuote } from '../helpers';

export const ReadyEvent = {
    name: Events.ClientReady,
    execute: async ({ guilds }: Client<true>) => {
        const { general, guild: guildId } = getVariables();

        runWeeklyJob(async () => {
            logInfo('quotes', 'Sending quote');

            try {
                const guild = await guilds.fetch(guildId);
                const channel = await getChannel(guild, general);

                channel?.send(await getQuote());
            } catch (error) {
                logError(error, 'quotes/sendingQuote');
            }
        });
    }
};
