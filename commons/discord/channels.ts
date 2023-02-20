import { Guild } from 'discord.js';

export default async ({ channels, systemChannel }: Guild, general: string) => {
    const channel = await channels.fetch(general);

    return channel?.isTextBased() ? channel : systemChannel;
};
