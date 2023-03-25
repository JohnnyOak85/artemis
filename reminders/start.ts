import { GatewayIntentBits, start } from '../shared';
import { Events } from './events';

start(Events, [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers], 'reminders');
