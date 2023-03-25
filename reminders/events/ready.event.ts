import { Client, Events, getVariables, logError, logInfo, NOON, runJob } from '../../shared';
import { startReminders } from '../helpers';

export const ReadyEvent = {
    name: Events.ClientReady,
    execute: async ({ guilds }: Client<true>) => {
        const { guild } = getVariables();

        try {
            logInfo('reminders', 'Starting reminders');
            startReminders(await guilds.fetch(guild));
        } catch (error) {
            logError(error, 'reminders/startReminders');
        }

        runJob(NOON, async () => {
            try {
                logInfo('reminders', 'Starting reminders');
                startReminders(await guilds.fetch(guild));
            } catch (error) {
                logError(error, 'reminders/startReminders');
            }
        });
    }
};
