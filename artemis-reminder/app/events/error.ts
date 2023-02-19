import Discord, { DiscordError } from 'commons/discord';
import { Log } from 'commons/tools';

export default {
    name: Discord.Events.error,
    execute: (error: DiscordError) => Log.error(error, 'reminder-main')
};
