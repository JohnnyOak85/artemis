import Discord, { DiscordEvent } from 'commons/discord';
import events from './events';

Discord.start(events as DiscordEvent[], [Discord.Intents.guilds, Discord.Intents.members]);
