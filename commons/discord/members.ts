import { Guild } from 'discord.js';

export default {
    getMember: ({ members }: Guild, memberId: string) => members.fetch(memberId),
    getRandomMember: async ({ members, client }: Guild) => {
        const member = (await members.fetch()).random();

        return member?.nickname || member?.displayName || client.user.username;
    }
};
