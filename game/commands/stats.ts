import Discord, { DiscordCommandInteraction } from '../../commons/discord';
import { buildMenu } from '../helpers/stats/menu';

const commandData = {
    description: 'Check your stats! (Game Category Exclusive)',
    dmPermission: false,
    name: 'stats'
};

export default {
    data: Discord.buildCommand(commandData),
    execute: async (interaction: DiscordCommandInteraction) => {
        const reply = await buildMenu(interaction);

        if (!reply) return;

        interaction.reply(reply);
    }
};
