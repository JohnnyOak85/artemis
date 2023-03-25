import { Collector } from '../../../shared';
import { Monster } from '../interfaces';

const store = new Collector<Monster>();
const key = 'monster';

export const MonsterStore = {
    getMonster: () => store.get(key),
    putMonster: (monster: Monster) => store.put(key, monster),
    deleteMonster: () => store.delete(key)
};
