import { Collector } from '../../../commons';

type Monster = {
    attack: number;
    defense: number;
    description: string;
    health: number;
    id: string;
    level: number;
    luck: number;
};

const store = new Collector<Monster>();
const key = 'monster';

export default {
    getMonster: () => store.get(key),
    putMonster: (monster: Monster) => store.put(key, monster)
};
