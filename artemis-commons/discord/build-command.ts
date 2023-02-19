import { SlashCommandBuilder } from 'discord.js';

export default (name: string, description: string) =>
    new SlashCommandBuilder().setName(name).setDescription(description);
