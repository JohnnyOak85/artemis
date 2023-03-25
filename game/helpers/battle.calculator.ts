import { divide, multiply, random, roundDown, tossCoin } from '../../shared';
import { Monster, Player } from './interfaces';
import { getBattleStats, getLevelStats, getLuckStats } from './stats';

export default {
    calcBoost: async (attribute: number) => {
        const boost = random();
        const { doubleChance, missChance } = await getBattleStats();

        if (boost < missChance) {
            return 0;
        } else if (boost > doubleChance) {
            return multiply(attribute);
        }

        return attribute;
    },
    calcDamage: async (damage: number, defense: number) => {
        const { damageControl } = await getBattleStats();
        const nerf = damageControl + defense;
        const control = damageControl / nerf;
        const finalDamage = damage * control;

        return roundDown(finalDamage);
    },
    calcExperience: async (monsterLevel: number, playerLevel: number) => {
        const { multiplier } = await getLevelStats();

        return divide(multiply(monsterLevel, multiplier), playerLevel);
    },
    calcHealth: (health: number, damage: number) => roundDown(health - damage),
    calcLevel: (level: number) => (level + 1) * 100,
    calcLuck: async (luck: number) => {
        const { cap } = await getLuckStats();

        return random(cap, luck) >= cap;
    },
    splitExp: (experience: number) => {
        const attackBuff = tossCoin();
        const split = random(experience);
        const comparer = experience - split;

        const bigSlice = comparer > split ? comparer : split;
        const littleSlice = comparer < split ? comparer : split;

        return {
            attackBoost: attackBuff ? bigSlice : littleSlice,
            defenseBoost: attackBuff ? littleSlice : bigSlice
        };
    },
    sumStats: ({ attack, defense, health, level, luck }: Monster | Player) =>
        attack + defense + health + level + luck
};
