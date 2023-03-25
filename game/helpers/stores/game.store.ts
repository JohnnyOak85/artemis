import { Collector, CronJob, getJob, VoidCallback } from '../../../shared';

const store = new Collector<CronJob>();
const key = 'job';

export const GameStore = {
    hasGame: () => store.has(key),
    restart: () => {
        store.get(key)?.start();
    },
    start: (callback: VoidCallback) => {
        const job = getJob('* * * * *', callback);
        store.put(key, job);
        job.start();
    },
    stop: () => {
        store.get(key)?.stop();
    }
};
