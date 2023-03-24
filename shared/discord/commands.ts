import {
    CommandInteraction,
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

type CommandOptions = {
    description: string;
    name: string;
    required?: boolean;
    type: string;
};

type Command = {
    description: string;
    dmPermission: boolean;
    memberPermissions?: bigint;
    name: string;
    options?: CommandOptions[];
};

type CommandBody = {
    execute: (interaction: CommandInteraction) => any;
};

interface CommandData extends CommandBody {
    data: SlashCommandBuilder;
}

const commandCollection = new Collector<CommandBody>();

const registerCommand = ({ body, clientId, guildId, token }: GuildCommand) =>
    new REST({ version: '10' })
        .setToken(token)
        .put(Routes.applicationGuildCommands(clientId, guildId), { body });

const setOptions = (
    slashCommand: SlashCommandBuilder,
    { description, name, required = false, type }: CommandOptions
) => {
    switch (type) {
        case 'user':
            slashCommand.addUserOption(option =>
                option.setName(name).setDescription(description).setRequired(!!required)
            );
            break;
        case 'string':
            slashCommand.addStringOption(option =>
                option.setName(name).setDescription(description)
            );
    }
};

export const buildCommand = ({
    description,
    dmPermission,
    memberPermissions,
    name,
    options
}: Command) => {
    const slashCommand = new SlashCommandBuilder()
        .setName(name)
        .setDescription(description)
        .setDMPermission(dmPermission)
        .setDefaultMemberPermissions(memberPermissions);

    options?.forEach(option => setOptions(slashCommand, option));

    return slashCommand;
};

export const getCommand = (commandName: string) => commandCollection.get(commandName);

export const registerCommands = async (
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
};
