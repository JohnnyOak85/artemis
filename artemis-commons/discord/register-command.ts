import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';

type CommandData = {
    body: RESTPostAPIChatInputApplicationCommandsJSONBody[];
    clientId: string;
    guildId: string;
    token: string;
};

export default ({ body, clientId, guildId, token }: CommandData) =>
    new REST({ version: '10' })
        .setToken(token)
        .put(Routes.applicationGuildCommands(clientId, guildId), { body });
