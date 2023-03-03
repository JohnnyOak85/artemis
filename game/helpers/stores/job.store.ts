import { Collector } from '../../../commons';
import { Job, Schedule } from '../../../commons/tools';

type Callback = () => void;

const store = new Collector<Job>();
const key = 'job';

export default {
    start: (callback: Callback) => {
        const job = Schedule.getJob('* * * * *', callback);
        store.put(key, job);
        job.start();
    },
    stop: () => {
        const job = store.get(key);
        job?.stop();
    }
};
