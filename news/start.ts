import Discord from '../commons/discord';
import events from './events';

Discord.start(events, [Discord.Intents.guilds]);
