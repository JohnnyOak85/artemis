import Discord from '../../commons/discord';
import { Log, Word } from '../../commons/tools';
import { getPlayers } from './player';

export const getScoreBoard = async () => {
    try {
        const players = await getPlayers();
        const scoreBoard: string[] = [];

        const sortedPlayers = players
            .sort((a, b) => a.wins - a.losses - (b.wins - b.losses))
            .reverse();

        sortedPlayers.forEach(({ losses, name, wins }, i) => {
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

        return Discord.buildEmbed({
            description: Word.buildList(scoreBoard),
            title: champion
        });
    } catch (error) {
        Log.error(error, 'getScoreBoard');
        throw error;
    }
};
