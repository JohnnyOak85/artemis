import { Collector } from '../../../commons';
import { Battler } from './fighter.store';

export interface Monster extends Battler {
    description: string;
    index: number;
}

const store = new Collector<Monster>();
const key = 'monster';

export default {
    getMonster: () => store.get(key),
    putMonster: (monster: Monster) => store.put(key, monster),
    deleteMonster: () => store.delete(key)
};
