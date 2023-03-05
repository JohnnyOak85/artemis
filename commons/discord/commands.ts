import {
    REST,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    Routes,
    SlashCommandBuilder
} from 'discord.js';

type CommandData = {
    body: RESTPostAPIChatInputApplicationCommandsJSONBody[];
    clientId: string;
    guildId: string;
    token: string;
};

export default {
    buildCommand: (name: string, description: string) =>
        new SlashCommandBuilder().setName(name).setDescription(description),
    registerCommand: ({ body, clientId, guildId, token }: CommandData) =>
        new REST({ version: '10' })
            .setToken(token)
            .put(Routes.applicationGuildCommands(clientId, guildId), { body })
};
