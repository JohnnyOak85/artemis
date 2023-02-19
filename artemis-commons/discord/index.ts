import {
    ChatInputCommandInteraction,
    Client,
    ClientEvents,
    ErrorEvent,
    Guild,
    GuildMember,
    Interaction,
    Message,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from 'discord.js';
import buildCommand from './build-command';
import buildEmbed from './build-embed';
import ChannelTypes from './channel-types';
import getChannel from './channels';
import Events from './events';
import Intents from './intents';
import registerCommand from './register-command';
import start from './start';
import getMember from './members';

type EventKey = keyof ClientEvents;

export type DiscordEvent = {
    name: EventKey;
    execute: (...args: ClientEvents[EventKey]) => Promise<void>;
};

export type DiscordClient = Client<true>;
export type DiscordCommandBody = RESTPostAPIChatInputApplicationCommandsJSONBody;
export type DiscordCommandInteraction = ChatInputCommandInteraction;
export type DiscordError = ErrorEvent;
export type DiscordInteraction = Interaction;
export type DiscordGuild = Guild;
export type DiscordMember = GuildMember;
export type DiscordMessage = Message;

export default {
    Events,
    ChannelTypes,
    Intents,
    buildCommand,
    buildEmbed,
    getChannel,
    getMember,
    registerCommand,
    start
};
