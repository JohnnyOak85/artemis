import { Calculator, Gamble } from '../../commons/tools';
import { Player } from './player';
import stats from './stats';
import { Monster } from './stores/monster.store';

export default {
    calcBoost: async (attribute: number) => {
        const boost = Gamble.random();
        const { doubleChance, missChance } = await stats.getBattleStats();

        if (boost < missChance) {
            return 0;
        } else if (boost > doubleChance) {
            return Calculator.multiply(attribute);
        }

        return attribute;
    },
    calcDamage: async (damage: number, defense: number) => {
        const { damageControl } = await stats.getBattleStats();
        const nerf = damageControl + defense;
        const control = damageControl / nerf;
        const finalDamage = damage * control;

        return Calculator.roundDown(finalDamage);
    },
    calcExperience: async (monsterLevel: number, playerLevel: number) => {
        const { multiplier } = await stats.getLevelStats();

        return Calculator.divide(Calculator.multiply(monsterLevel, multiplier), playerLevel);
    },
    calcHealth: (health: number, damage: number) => Calculator.roundDown(health - damage),
    calcLevel: (level: number) => (level + 1) * 100,
    calcLuck: async (luck: number) => {
        const { cap } = await stats.getLuckStats();

        return Gamble.random(cap, luck) >= cap;
    },
    splitExp: (experience: number) => {
        const attackBuff = Gamble.tossCoin();
        const split = Gamble.random(experience);
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
