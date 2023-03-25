import { Client, Events, getVariables, logError, logInfo, registerCommands } from '../../shared';
import { Commands } from '../commands';

export const ReadyEvent = {
    name: Events.ClientReady,
    execute: async ({ token, user }: Client<true>) => {
        try {
            const { guild } = getVariables();

            logInfo('moderation', 'Registering commands');
            await registerCommands(token, user.id, guild, Commands);
        } catch (error) {
            logError(error, 'moderation/registeringCommands');
        }
    }
};
