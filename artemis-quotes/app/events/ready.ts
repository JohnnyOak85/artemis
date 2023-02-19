import Discord, { DiscordClient } from 'commons/discord';
import { Environment, Schedule } from 'commons/tools';
import getQuote from '../helpers/quotes';

export default {
    name: Discord.Events.ready,
    execute: async ({ guilds }: DiscordClient) => {
        const { general, guild: guildId } = Environment.get();

        Schedule.run(Schedule.WEEK_START, () => {
            Schedule.runOnce(Schedule.generateTimestamp(), async () => {
                const guild = await guilds.fetch(guildId);
                const channel = await Discord.getChannel(guild, general);

                channel?.send(await getQuote());
            });
        });
    }
};
