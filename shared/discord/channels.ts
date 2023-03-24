import { ChannelType, Guild, TextChannel } from 'discord.js';

export const getChannel = async ({ channels, systemChannel }: Guild, channelId: string) => {
    const channel = await channels.fetch(channelId);

    return channel instanceof TextChannel ? channel : systemChannel;
};

export const isDM = (type: ChannelType) => type === ChannelType.DM;

export const isText = (type: ChannelType) => type === ChannelType.GuildText;
