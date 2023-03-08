import Discord, { DiscordCommandInteraction } from '../../commons/discord';
import { Environment } from '../../commons/tools';
import toggler from '../helpers/toggler';

const commandData = {
    description: 'Toggle the game on or off. (Mod && Game Category Exclusive)',
    dmPermission: false,
    memberPermissions: Discord.Permissions.admin,
    name: 'toggle'
};

export default {
    data: Discord.buildCommand(commandData),
    execute: async (interaction: DiscordCommandInteraction) => {
        const { game } = Environment.get();

        if (interaction.channelId !== game) {
            return interaction.reply('I cannot oblige'); // TODO Get special random replies
        }

        await interaction.reply(await toggler(interaction.guild));
    }
};
