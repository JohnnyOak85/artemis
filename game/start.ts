import { GatewayIntentBits, start } from '../shared';
import { Events } from './events';

start(
    Events,
    [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ],
    'game'
);
