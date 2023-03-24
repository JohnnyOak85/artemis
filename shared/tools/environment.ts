import { config } from 'dotenv';
import { envPath as path } from '../paths';

const startEnvironment = () => {
    const { error } = config({ path });

    if (error) {
        throw error;
    }
};

export const getVariables = () => {
    try {
        startEnvironment();

        return {
            api: process.env.API_URL!,
            game: process.env.GAME_CHANNEL!,
            general: process.env.GENERAL_CHANNEL!,
            guild: process.env.GUILD_ID!,
            monsterApi: process.env.MONSTER_API!,
            token: process.env.TOKEN!
        };
    } catch (error) {
        throw error;
    }
};
