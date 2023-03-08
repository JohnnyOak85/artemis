import Discord, { DiscordClient } from '../../commons/discord';
import { Environment } from '../../commons/tools';
import { registerCommands } from '../helpers/commands';

export default {
    name: Discord.Events.ready,
    execute: async ({ token, user }: DiscordClient) => {
        try {
            const { guild } = Environment.get();

            await registerCommands(token, user.id, guild);

            console.log('ready');
        } catch (error) {
            console.log(error);
        }
    }
};
