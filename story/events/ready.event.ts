import {
    Client,
    Events,
    getChannel,
    getRandomMemberNickname,
    getVariables,
    logError,
    logInfo,
    runWeeklyJob
} from '../../shared';
import { buildStory } from '../helpers';

export const ReadyEvent = {
    name: Events.ClientReady,
    execute: async ({ guilds }: Client<true>) => {
        const { general, guild: guildId } = getVariables();

        runWeeklyJob(async () => {
            logInfo('story', 'Sending story');

            try {
                const guild = await guilds.fetch(guildId);
                const member = await getRandomMemberNickname(guild);
                const channel = await getChannel(guild, general);

                channel?.send(await buildStory(member));
            } catch (error) {
                logError(error, 'story/sendingStory');
            }
        });
    }
};
