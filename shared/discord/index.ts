import {
    APIInteractionGuildMember,
    ButtonInteraction,
    CacheType,
    Client,
    ClientEvents,
    CommandInteraction,
    ErrorEvent,
    Events,
    GatewayIntentBits,
    Guild,
    GuildMember,
    Interaction,
    Message,
    PermissionFlagsBits,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    TextChannel,
    User
} from 'discord.js';

export * from './buttons';
export * from './channels';
export * from './commands';
export * from './embeds';
export * from './members';
export * from './roles';
export * from './start';

type EventKey = keyof ClientEvents;

export type DiscordEvent = {
    name: keyof ClientEvents;
    execute: (...args: ClientEvents[EventKey]) => Promise<void> | void;
};

export {
    APIInteractionGuildMember,
    ButtonInteraction,
    CacheType,
    Client,
    CommandInteraction,
    ErrorEvent,
    Events,
    Interaction,
    GatewayIntentBits,
    Guild,
    GuildMember,
    Message,
    PermissionFlagsBits,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    TextChannel,
    User
};
