import Discord, { DiscordClient } from '../../commons/discord';
import { Environment } from '../../commons/tools';
import commands from '../commands';

export default {
    name: Discord.Events.ready,
    execute: async ({ token, user }: DiscordClient) => {
        try {
            const { guild } = Environment.get();

            await Discord.registerCommands(token, user.id, guild, commands);

            console.log('ready');
        } catch (error) {
            console.log(error);
        }
    }
};
