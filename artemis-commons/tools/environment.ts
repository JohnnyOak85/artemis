import { config } from 'dotenv';
import log from './log';
import paths from '../paths';

export default {
    get: () => ({
        api: `${process.env.API_URL}/${process.env.API_SUFFIX}` || '',
        general: process.env.GENERAL_CHANNEL || '',
        guild: process.env.GUILD_ID || '',
        token: process.env.TOKEN || ''
    }),
    start: () => {
        const { error } = config({ path: paths.environment });

        if (error) {
            log.error(error, 'startEnvironment');
            throw error;
        }
    }
};
