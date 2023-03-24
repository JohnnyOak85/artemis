import { config } from 'dotenv';
import log from './log';
import paths from '../paths';

export default {
    get: () => ({
        api: `${process.env.API_URL}` || '',
        game: process.env.GAME_CHANNEL || '',
        general: process.env.GENERAL_CHANNEL || '',
        guild: process.env.GUILD_ID || '',
        monsterApi: process.env.MONSTER_API || '',
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
