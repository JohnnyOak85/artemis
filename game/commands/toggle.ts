import Discord, { DiscordCommandInteraction } from '../../commons/discord';
import toggler from '../helpers/toggler';

export default {
    data: Discord.buildCommand('toggle', 'Toggle the game on or off.'),
    execute: async (interaction: DiscordCommandInteraction) =>
        await interaction.reply(await toggler(interaction.guild))
};
