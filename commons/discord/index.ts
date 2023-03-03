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
import buildCommand from './build-command';
import buildEmbed from './build-embed';
import ChannelTypes from './channel-types';
import getChannel from './channels';
import getMember from './members';
import getRoles from './roles';
import Events from './events';
import Intents from './intents';
import registerCommand from './register-command';
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
    buildCommand,
    buildEmbed,
    getChannel,
    getMember,
    getRoles,
    registerCommand,
    start
};
