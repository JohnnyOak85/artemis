import { Client, Events, getVariables, registerCommands } from '../../shared';
import { Commands } from '../commands';

export default {
    name: Events.ClientReady,
    execute: async ({ token, user }: Client<true>) => {
        try {
            const { guild } = getVariables();

            await registerCommands(token, user.id, guild, Commands);

            console.log('ready');
        } catch (error) {
            console.log(error);
        }
    }
};
