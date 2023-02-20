import Discord, { DiscordClient } from '../../commons/discord';
import { Environment, Schedule } from '../../commons/tools';
import startReminders from '../helpers/reminder';

export default {
    name: Discord.Events.ready,
    execute: async ({ guilds }: DiscordClient) => {
        const { guild } = Environment.get();

        Schedule.run(Schedule.NOON, async () => {
            startReminders(await guilds.fetch(guild));
        });
    }
};
