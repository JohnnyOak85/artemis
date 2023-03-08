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

type CommandInfo = {
    description: string;
    dmPermission: boolean;
    memberPermissions?: bigint;
    name: string;
};

export default {
    buildCommand: ({ description, dmPermission, memberPermissions, name }: CommandInfo) =>
        new SlashCommandBuilder()
            .setName(name)
            .setDescription(description)
            .setDMPermission(dmPermission)
            .setDefaultMemberPermissions(memberPermissions),
    registerCommand: ({ body, clientId, guildId, token }: CommandData) =>
        new REST({ version: '10' })
            .setToken(token)
            .put(Routes.applicationGuildCommands(clientId, guildId), { body })
};
