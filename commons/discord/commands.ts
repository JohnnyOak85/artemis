import {
    ButtonInteraction,
    CacheType,
    ChatInputCommandInteraction,
    REST,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    Routes,
    SlashCommandBuilder
} from 'discord.js';
import { Collector } from '..';

type GuildCommand = {
    body: RESTPostAPIChatInputApplicationCommandsJSONBody[];
    clientId: string;
    guildId: string;
    token: string;
};

type Command = {
    description: string;
    dmPermission: boolean;
    memberPermissions?: bigint;
    name: string;
};

type CommandBody = {
    execute: (interaction: ChatInputCommandInteraction | ButtonInteraction<CacheType>) => any;
};

interface CommandData extends CommandBody {
    data: SlashCommandBuilder;
}

const commandCollection = new Collector<CommandBody>();

const registerCommand = ({ body, clientId, guildId, token }: GuildCommand) =>
    new REST({ version: '10' })
        .setToken(token)
        .put(Routes.applicationGuildCommands(clientId, guildId), { body });

export default {
    buildCommand: ({ description, dmPermission, memberPermissions, name }: Command) =>
        new SlashCommandBuilder()
            .setName(name)
            .setDescription(description)
            .setDMPermission(dmPermission)
            .setDefaultMemberPermissions(memberPermissions),
    getCommand: (commandName: string) => commandCollection.get(commandName),
    registerCommands: async (
        token: string,
        clientId: string,
        guildId: string,
        commands: CommandData[]
    ) => {
        const body: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

        for (const { data, execute } of commands) {
            commandCollection.put(data.name, { execute });
            body.push(data.toJSON());
        }

        registerCommand({ body, clientId, guildId, token });
    }
};
