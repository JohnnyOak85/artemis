import moment from 'moment';

const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss:SSS';

export default {
    get: () => moment().format(TIMESTAMP_FORMAT),
    getTimestamp: () => moment().valueOf()
};
