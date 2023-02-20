import { Guild } from 'discord.js';

export default async ({ members, client }: Guild) => {
    const member = (await members.fetch()).random();

    return member?.nickname || member?.displayName || client.user.username;
};
