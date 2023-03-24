import { APIInteractionGuildMember, Guild, GuildMember, GuildMemberRoleManager } from 'discord.js';

export const getMember = ({ members }: Guild, memberId: string) => members.fetch(memberId);

export const getMemberNickname = async (
    { members }: Guild,
    memberId: string,
    defaultName: string
) => {
    const member = await members.fetch(memberId);

    return member?.nickname || member?.displayName || defaultName;
};

export const getRandomMemberNickname = async ({ members, client }: Guild) => {
    const member = (await members.fetch()).random();

    return member?.nickname || member?.displayName || client.user.username;
};

export const getMemberRoles = (member: GuildMember | APIInteractionGuildMember | null) =>
    (member?.roles as GuildMemberRoleManager).valueOf().map(role => role);
