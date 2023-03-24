import { Guild } from 'discord.js';

export default {
    getMember: ({ members }: Guild, memberId: string) => members.fetch(memberId),
    getMemberNickname: async ({ members }: Guild, memberId: string, defaultName: string) => {
        const member = await members.fetch(memberId);

        return member?.nickname || member?.displayName || defaultName;
    },
    getRandomMember: async ({ members, client }: Guild) => {
        const member = (await members.fetch()).random();

        return member?.nickname || member?.displayName || client.user.username;
    }
};
