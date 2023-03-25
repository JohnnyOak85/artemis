import { buildCommand, CommandInteraction } from '../../shared';
import { buildMenu } from '../helpers';

const commandData = {
    description: 'Check your stats! (Game Category Exclusive)',
    dmPermission: false,
    name: 'stats'
};

export default {
    data: buildCommand(commandData),
    execute: async (interaction: CommandInteraction) => {
        const reply = await buildMenu(interaction);

        if (!reply) return;

        interaction.reply(reply);
    }
};
