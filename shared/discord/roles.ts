import { Guild } from 'discord.js';

export const getGuildRole = ({ roles }: Guild, roleId: string) => roles.fetch(roleId);
