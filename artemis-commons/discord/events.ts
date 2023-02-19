import { Events } from 'discord.js';

export default {
    error: Events.Error,
    interaction: Events.InteractionCreate,
    message: Events.MessageCreate,
    ready: Events.ClientReady
};
