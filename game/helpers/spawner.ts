import { Dictionary } from '../../commons';
import buildEmbed from '../../commons/discord/build-embed';
import { Api, Environment, Gamble, Log } from '../../commons/tools';
import monsterStore from './stores//monster.store';
import stats from './stats';

type Area = Dictionary<string>[];

type RankData = {
    chance: number;
    class: string;
    color: string;
    index: number;
    title: string;
};

const getData = async <T>(url: string) => Api.get<T>(`game/${url}`);

const getRankInfo = async () => {
    try {
        const ranks = await getData<RankData[]>('rank');
        let rank: RankData | undefined;

        while (!rank) {
            const randomChance = Gamble.random();
            rank = ranks.find(({ chance }) => randomChance <= chance);
        }

        return rank;
    } catch (error) {
        Log.error(error, 'getRank');
        throw error;
    }
};

const getMonsterInfo = async (rank: number) => {
    try {
        const area = await getData<Area>('area-data');
        const rankMonsters = area[rank];
        const monsterList = Object.keys(rankMonsters);
        const monster = monsterList[Gamble.randomIndex(monsterList)];

        return {
            id: monster,
            description: rankMonsters[monster]
        };
    } catch (error) {
        Log.error(error, 'getMonsterInfo');
        throw error;
    }
};

const getMonsterStats = async (rank: number) => {
    const level = await stats.calcLevel(rank);
    const { attack, defense } = await stats.calcStats(level);

    return {
        attack,
        defense,
        health: await stats.calcHealth(level),
        level,
        luck: await stats.calcLuck(level)
    };
};

export default async () => {
    try {
        const { color, index, title } = await getRankInfo();
        const { id, description } = await getMonsterInfo(index);
        const { attack, defense, health, level, luck } = await getMonsterStats(index + 1);
        const { monsterApi } = Environment.get();

        monsterStore.putMonster({
            attack,
            defense,
            description,
            health,
            id,
            level,
            luck
        });

        return buildEmbed({
            color: Number(color),
            description: `A level ${level} ${description} appears!`,
            thumbnail: `${monsterApi}/${id}.png`,
            title
        });
    } catch (error) {
        Log.error(error, 'spawner');
        throw error;
    }
};
