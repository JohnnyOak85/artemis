import { Collector, VoidCallback } from '../../../commons';
import { Job, Schedule } from '../../../commons/tools';

const store = new Collector<Job>();
const key = 'job';

export default {
    hasGame: () => store.has(key),
    restart: () => {
        store.get(key)?.start();
    },
    start: (callback: VoidCallback) => {
        const job = Schedule.getJob('* * * * *', callback);
        store.put(key, job);
        job.start();
    },
    stop: () => {
        store.get(key)?.stop();
    }
};
