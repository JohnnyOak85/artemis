import {
    buildList,
    Dictionary,
    getData,
    multiply,
    random,
    randomIndex,
    TextChannel,
    tossCoin
} from '../../shared';
import { checkBoss, checkMonster, checkStats } from './achievements';
import battleCalculator from './battle.calculator';
import { Monster, Player } from './interfaces';
import { levelUp, rankUp } from './level-up';
import { getAttributeStats, getHealthStats, getLuckStats, getStatCaps } from './stats';

const boostStats = async (player: Player, monsterLevel: number, reply: string[]) => {
    const { statCap } = await getStatCaps();

    if (player.attack + player.defense >= statCap) return '';

    const experience = await battleCalculator.calcExperience(monsterLevel, player.level);
    const { attackBoost, defenseBoost } = battleCalculator.splitExp(experience);

    reply.push(boostStat(player, 'attack', attackBoost));
    reply.push(boostStat(player, 'defense', defenseBoost));
};

const boostStat = (player: Player, stat: 'attack' | 'defense', boost: number) => {
    if (!boost) return '';

    player[stat] += boost;

    return `**+${boost} ${stat[0].toUpperCase()}${stat.substring(1)}.**`;
};

const boostHealth = async ({ health, level }: Player, currentLevel: number) => {
    const { cap, maxControl, maxDivisor } = await getHealthStats();

    if (level <= currentLevel || health > cap) return '';

    const gain = random(maxControl, maxDivisor);
    health += gain + multiply(level);

    return `**+${gain} Health.**`;
};

const boostLuck = async (player: Player, monster: Monster) => {
    const { cap, chance } = await getLuckStats();

    if (player.luck >= cap) return '';

    if (
        battleCalculator.sumStats(player) >= battleCalculator.sumStats(monster) ||
        random() > chance
    )
        return '';

    player.luck += 1;

    return `**+1 Luck.**`;
};

const boostAttributes = async (reply: string[]) => {
    const { max } = await getAttributeStats();
    const attributes = await getData<string[]>('game/players/attributes');
    const attributesGained: Dictionary<number> = {};
    let gainCounter = 0;

    while (gainCounter <= max) {
        const chance = tossCoin();

        if (chance) {
            const index = randomIndex(attributes);

            attributesGained[attributes[index]] ??= 0;
            attributesGained[attributes[index]]++;
        }

        gainCounter++;
    }

    for (const stat in attributesGained) {
        reply.push(`**+${attributesGained[stat]} ${stat}.**`);
    }
};

export const getBuffs = async (player: Player, monster: Monster, channel: TextChannel) => {
    const reply = [`**${player.name}** wins!`];
    const currentLevel = player.level;

    reply.push(checkBoss(player, monster));
    reply.push(await checkMonster(player, monster));
    reply.push(await levelUp(player));
    reply.push(await rankUp(player, channel));
    reply.push(await boostHealth(player, currentLevel));
    boostStats(player, monster.level, reply);
    reply.push(await boostLuck(player, monster));
    reply.push(await checkStats(player));

    await boostAttributes(reply);

    channel.send(buildList(reply));
};
