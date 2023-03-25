import {
    Dictionary,
    getData,
    getEmbedObject,
    getVariables,
    logError,
    random,
    randomIndex
} from '../../shared';
import { calcHealth, calcLevel, calcLuck, calcStats } from './stats';
import { MonsterStore } from './stores';

type Area = Dictionary<string>[];

type RankData = {
    chance: number;
    color: string;
    index: number;
    title: string;
};

const getRankInfo = async () => {
    try {
        const ranks = await getData<RankData[]>('game/ranks');
        let rank: RankData | undefined;

        while (!rank) {
            const randomChance = random();
            rank = ranks.find(({ chance }) => randomChance <= chance);
        }

        return rank;
    } catch (error) {
        logError(error, 'getRank');
        throw error;
    }
};

const getMonsterInfo = async (rank: number) => {
    try {
        const area = await getData<Area>('game/areas/data');
        const rankMonsters = area[rank];
        const monsterList = Object.keys(rankMonsters);
        const monster = monsterList[randomIndex(monsterList)];

        return {
            id: monster,
            description: rankMonsters[monster]
        };
    } catch (error) {
        logError(error, 'getMonsterInfo');
        throw error;
    }
};

const getMonsterStats = async (rank: number) => {
    const level = await calcLevel(rank);
    const { attack, defense } = await calcStats(level);

    return {
        attack,
        defense,
        health: await calcHealth(level),
        level,
        luck: await calcLuck(level)
    };
};

export const spawnMonster = async () => {
    try {
        const { color, index, title } = await getRankInfo();
        const { id, description } = await getMonsterInfo(index);
        const { attack, defense, health, level, luck } = await getMonsterStats(index + 1);
        const { monsterApi } = getVariables();

        MonsterStore.putMonster({
            attack,
            defense,
            description,
            health,
            id,
            index,
            level,
            luck
        });

        return getEmbedObject([
            {
                color: Number(color),
                description: `A level ${level} ${description} appears!`,
                thumbnail: `${monsterApi}/${id}.png`,
                title
            }
        ]);
    } catch (error) {
        logError(error, 'spawner');
        throw error;
    }
};
