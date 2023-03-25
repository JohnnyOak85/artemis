import { GatewayIntentBits, start } from '../shared';
import { Events } from './events';

start(
    Events,
    [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
    'speech'
);
