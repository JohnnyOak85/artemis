import Discord, { DiscordMessage } from 'commons/discord';
import { checkMessage } from '../helpers/speech';

export default {
    name: Discord.Events.message,
    execute: (message: DiscordMessage) => checkMessage(message)
};
