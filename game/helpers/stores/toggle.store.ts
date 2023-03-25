import { Collector } from '../../../shared';

const store = new Collector<boolean>();
const key = 'running';

export const ToggleStore = {
    toggle: () => {
        store.put(key, !store.get(key));
    },
    isRunning: () => !!store.get(key)
};
