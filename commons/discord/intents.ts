import { GatewayIntentBits } from 'discord.js';

export default {
    content: GatewayIntentBits.MessageContent,
    guilds: GatewayIntentBits.Guilds,
    members: GatewayIntentBits.GuildMembers,
    messages: GatewayIntentBits.GuildMessages,
    moderation: GatewayIntentBits.GuildModeration
};
