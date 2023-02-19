import { CronJob } from 'cron';
import { Gamble } from '.';

type Callback = () => void;
type Timestamp = number | string;

const parseTimestamp = (timestamp: Timestamp) =>
    typeof timestamp === 'string' ? timestamp : new Date(timestamp);

export default {
    generateTimestamp: () =>
        `${Gamble.random(59, 0)} ${Gamble.random(23, 0)} * * ${Gamble.random(6, 0)}`,
    run: (timestamp: Timestamp, callBack: Callback) =>
        new CronJob(parseTimestamp(timestamp), callBack).start(),
    runOnce: (timestamp: Timestamp, callBack: Callback) => {
        const job = new CronJob(parseTimestamp(timestamp), () => {
            callBack();
            job.stop();
        });

        job.start();
    },
    NOON: '0 12 * * *', // Every day at 12:00.
    WEEK_START: '0 0 * * 0' // At 00:00 on Sunday.
};
