import Discord, { DiscordClient } from '../../commons/discord';
import { Environment } from '../../commons/tools';
import { getNews } from '../helpers';

export default {
    name: Discord.Events.ready,
    execute: async ({ guilds }: DiscordClient) => {
        const { guild: guildId } = Environment.get();

        const guild = await guilds.fetch(guildId);
        const channel = await Discord.getChannel(guild, '1005121368066621560');

        channel?.send({ content: `Here's today's gaming news!`, embeds: await getNews('gaming') });
    }
};
