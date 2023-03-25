import { Dictionary, getData, getGuildRole, getMember, TextChannel } from '../../shared';
import battleCalculator from './battle.calculator';
import { Player } from './interfaces';
import { getLevelStats } from './stats';

export const levelUp = async ({ attack, defense, level }: Player) => {
    const { max } = await getLevelStats();

    if (level >= max) return '';

    const playerStats = attack + defense;

    if (playerStats <= battleCalculator.calcLevel(level)) return '';

    level += 1;

    return `Level up! **${level - 1} -> ${level}**`;
};

export const rankUp = async ({ achievements, id, level, rank }: Player, { guild }: TextChannel) => {
    const { max } = await getLevelStats();

    if (level < max) return '';

    const oldRank = await getGuildRole(guild, rank);

    if (!oldRank?.id) return '';

    const playerRanks = await getData<Dictionary<string>>('game/players/ranks');
    const newRank = await getGuildRole(guild, playerRanks[rank]);

    if (!newRank?.id) return '';

    rank = newRank.id;

    const member = await getMember(guild, id);

    try {
        await Promise.all([member.roles.remove(oldRank), member.roles.add(newRank)]);
    } catch (error) {
        return '';
    }

    achievements.push(`Ranked up to ${newRank.name}`);

    return `Rank up! **${oldRank.name} -> ${newRank.name}**`;
};
