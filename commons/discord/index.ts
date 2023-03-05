import {
    ChatInputCommandInteraction,
    Client,
    ClientEvents,
    ErrorEvent,
    Guild,
    GuildMember,
    Interaction,
    Message,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    TextChannel
} from 'discord.js';
import ChannelTypes from './channel-types';
import channels from './channels';
import commands from './commands';
import embeds from './embeds';
import Events from './events';
import Intents from './intents';
import members from './members';
import roles from './roles';
import start from './start';

export class DiscordChannel extends TextChannel {}

type EventKey = keyof ClientEvents;

export type DiscordEvent = {
    name: EventKey;
    execute: (...args: ClientEvents[EventKey]) => Promise<void> | void;
};

export type DiscordClient = Client<true>;
export type DiscordCommandBody = RESTPostAPIChatInputApplicationCommandsJSONBody;
export type DiscordCommandInteraction = ChatInputCommandInteraction;
export type DiscordError = ErrorEvent;
export type DiscordInteraction = Interaction;
export type DiscordGuild = Guild;
export type DiscordMember = GuildMember;
export type DiscordMessage = Message<true>;

export default {
    Events,
    ChannelTypes,
    Intents,
    ...channels,
    ...commands,
    ...embeds,
    ...members,
    ...roles,
    start
};
