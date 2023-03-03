import { Collector } from '../../../commons';

const store = new Collector<boolean>();
const key = 'running';

export default {
    toggle: () => {
        store.put(key, !store.get(key));
    },
    isRunning: () => !!store.get(key)
};
