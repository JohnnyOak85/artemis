import {
    APIInteractionGuildMember,
    ButtonInteraction,
    CacheType,
    Client,
    ClientEvents,
    CommandInteraction,
    ErrorEvent,
    Guild,
    GuildMember,
    Interaction,
    Message,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    TextChannel,
    User
} from 'discord.js';
import buttons from './buttons';
import ButtonStyles from './button-styles';
import ChannelTypes from './channel-types';
import channels from './channels';
import commands from './commands';
import embeds from './embeds';
import Events from './events';
import Intents from './intents';
import members from './members';
import Permissions from './permissions';
import roles from './roles';
import start from './start';

export * from './embeds';
export class DiscordChannel extends TextChannel {}

type EventKey = keyof ClientEvents;

export type DiscordEvent = {
    name: EventKey;
    execute: (...args: ClientEvents[EventKey]) => Promise<void> | void;
};

export type DiscordClient = Client<true>;
export type DiscordCommandBody = RESTPostAPIChatInputApplicationCommandsJSONBody;
export type DiscordCommandInteraction = CommandInteraction;
export type DiscordButtonInteraction = ButtonInteraction<CacheType>;
export type DiscordError = ErrorEvent;
export type DiscordInteraction = Interaction;
export type DiscordGuild = Guild;
export type DiscordMember = GuildMember;
export type DiscordInteractionMember = GuildMember | APIInteractionGuildMember;
export type DiscordMessage = Message<true>;
export type DiscordUser = User;

export default {
    ButtonStyles,
    ChannelTypes,
    Events,
    Intents,
    Permissions,
    ...buttons,
    ...channels,
    ...commands,
    ...embeds,
    ...members,
    ...roles,
    start
};
