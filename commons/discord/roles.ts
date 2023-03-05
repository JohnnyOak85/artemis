import { APIInteractionGuildMember, Guild, GuildMember, GuildMemberRoleManager } from 'discord.js';

export default {
    getPlayerRoles: (member: GuildMember | APIInteractionGuildMember | null) =>
        (member?.roles as GuildMemberRoleManager).valueOf().map(role => role),
    getGuildRole: ({ roles }: Guild, roleId: string) => roles.fetch(roleId)
};
