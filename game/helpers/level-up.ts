import { Dictionary } from '../../commons';
import Discord, { DiscordChannel } from '../../commons/discord';
import { Api } from '../../commons/tools';
import battleCalculator from './battle.calculator';
import { Player } from './player';
import stats from './stats';

export const levelUp = async ({ attack, defense, level }: Player) => {
    const { max } = await stats.getLevelStats();

    if (level >= max) return '';

    const playerStats = attack + defense;

    if (playerStats <= battleCalculator.calcLevel(level)) return '';

    level += 1;

    return `Level up! **${level - 1} -> ${level}**`;
};

export const rankUp = async (
    { achievements, id, level, rank }: Player,
    { guild }: DiscordChannel
) => {
    const { max } = await stats.getLevelStats();

    if (level < max) return '';

    const oldRank = await Discord.getGuildRole(guild, rank);

    if (!oldRank?.id) return '';

    const playerRanks = await Api.get<Dictionary<string>>('game/player/ranks');
    const newRank = await Discord.getGuildRole(guild, playerRanks[rank]);

    if (!newRank?.id) return '';

    rank = newRank.id;

    const member = await Discord.getMember(guild, id);

    try {
        await Promise.all([member.roles.remove(oldRank), member.roles.add(newRank)]);
    } catch (error) {
        return '';
    }

    achievements.push(`Ranked up to ${newRank.name}`);

    return `Rank up! **${oldRank.name} -> ${newRank.name}**`;
};
