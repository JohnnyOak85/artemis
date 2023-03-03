import { APIInteractionGuildMember, GuildMember, GuildMemberRoleManager } from 'discord.js';

export default (member: GuildMember | APIInteractionGuildMember | null) =>
    (member?.roles as GuildMemberRoleManager).valueOf().map(role => role);
