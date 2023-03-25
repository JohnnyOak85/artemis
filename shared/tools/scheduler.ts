import { CronJob } from 'cron';
import { Collector, random, VoidCallback } from '..';

type Timestamp = number | string;

const key = 'job';
const jobs = new Collector<CronJob>();

const parseTimestamp = (timestamp: Timestamp) =>
    typeof timestamp === 'string' ? timestamp : new Date(timestamp);

export const NOON = '0 12 * * *'; // Every day at 12:00.
export const WEEK_START = '0 0 * * 0'; // At 00:00 on Sunday.

export const getJob = (timestamp: Timestamp, callBack: VoidCallback) =>
    new CronJob(parseTimestamp(timestamp), callBack);

export const generateTimestamp = () => `${random(59, 0)} ${random(23, 0)} * * ${random(6, 0)}`;

export const runJob = (timestamp: Timestamp, callBack: VoidCallback) =>
    new CronJob(parseTimestamp(timestamp), callBack).start();

export const runJobOnce = (timestamp: Timestamp, callBack: VoidCallback) => {
    const job = new CronJob(parseTimestamp(timestamp), () => {
        callBack();
        job.stop();
    });

    job.start();
};

export const runJobTemp = (timestamp: Timestamp, callBack: VoidCallback) => {
    const job = new CronJob(parseTimestamp(timestamp), callBack);
    jobs.put(key, job);
    job.start();
};

export const stopJob = () => {
    const job = jobs.get(key);
    job?.stop();
};

export const runWeeklyJob = (callBack: VoidCallback) =>
    runJob(WEEK_START, () => {
        runJobOnce(generateTimestamp(), callBack);
    });

export const runDailyJob = (callback: VoidCallback) => runJob(NOON, callback);

export { CronJob };
