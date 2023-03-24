import Discord, { DiscordCommandInteraction } from '../../commons/discord';
import { getScoreBoard } from '../helpers/score';

const commandData = {
    description: 'Check the scoreboard! (Game Category Exclusive)',
    dmPermission: false,
    name: 'score'
};

export default {
    data: Discord.buildCommand(commandData),
    execute: async (interaction: DiscordCommandInteraction) => {
        interaction.reply(await getScoreBoard(interaction));
    }
};
