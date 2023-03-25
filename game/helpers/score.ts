import {
    buildList,
    CommandInteraction,
    getEmbedObject,
    getMemberNickname,
    Guild,
    logError
} from '../../shared';
import { getPlayers } from './player';

const getRanking = async (guild: Guild | null) => {
    const players = await getPlayers();
    const sortedPlayers = players.sort((a, b) => a.wins - a.losses - (b.wins - b.losses)).reverse();

    if (!guild) {
        return sortedPlayers;
    }

    return Promise.all(
        sortedPlayers.map(async player => {
            if (player._id) {
                player.name = await getMemberNickname(guild, player._id, player.name);
            }

            return player;
        })
    );
};

export const getScoreBoard = async ({ guild }: CommandInteraction) => {
    try {
        const ranking = await getRanking(guild);
        const scoreBoard: string[] = [];

        ranking.forEach(({ losses, name, wins }, i) => {
            if (i === 0) {
                scoreBoard.push(`:trophy: ${name}: ${wins - losses}`);
            } else if (i === 1) {
                scoreBoard.push(`:second_place: ${name}: ${wins - losses}`);
            } else if (i === 2) {
                scoreBoard.push(`:third_place: ${name}: ${wins - losses}`);
            } else {
                scoreBoard.push(`${i + 1}. ${name}: ${wins - losses}`);
            }
        });

        const champion = scoreBoard.shift();

        return getEmbedObject([
            {
                description: buildList(scoreBoard),
                title: champion
            }
        ]);
    } catch (error) {
        logError(error, 'getScoreBoard');
        throw error;
    }
};
