import { Api } from '../../commons/tools';
import { Player } from './player';
import stats from './stats';
import { Monster } from './stores/monster.store';

const getData = <T>(url: string) => Api.get<T>(`game/areas/${url}`);

export const checkBoss = ({ achievements }: Player, { index, description }: Monster) => {
    if (index < 3) return '';

    const achievement = `${description} Slayer`;

    if (!achievements.includes(achievement)) {
        achievements.push(`${description} Slayer`);
    }

    return `You just defeated the **${description}**! Congratulations!`;
};

export const checkMonster = async ({ achievements, bestiary }: Player, { id }: Monster) => {
    try {
        const monsterList = await getData<string[]>('list');
        const currentArea = await getData<string>('name');
        const achievement = `${currentArea} Conqueror`;
        const playerMonsters = bestiary.filter(monster => monsterList.includes(monster));

        if (!bestiary.includes(id)) {
            bestiary.push(id);
        }

        if (playerMonsters.length === monsterList.length && !achievements.includes(achievement)) {
            achievements.push(achievement);

            return `You just defeated every monster! Congratulations!`;
        }

        return '';
    } catch (error) {
        throw error;
    }
};

export const checkStats = async ({ achievements, attack, defense, health, luck }: Player) => {
    const achievement = 'Maxed all stats';
    const { healthCap, luckCap, statCap } = await stats.getStatCaps();

    if (
        attack + defense >= statCap &&
        health >= healthCap &&
        luck >= luckCap &&
        !achievements.includes(achievement)
    ) {
        achievements.push(achievement);

        return 'You maxed up all you stats! Congratulations';
    }

    return '';
};
