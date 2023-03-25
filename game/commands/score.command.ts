import { buildCommand, CommandInteraction } from '../../shared';
import { getScoreBoard } from '../helpers';

const commandData = {
    description: 'Check the scoreboard! (Game Category Exclusive)',
    dmPermission: false,
    name: 'score'
};

export default {
    data: buildCommand(commandData),
    execute: async (interaction: CommandInteraction) => {
        interaction.reply(await getScoreBoard(interaction));
    }
};
