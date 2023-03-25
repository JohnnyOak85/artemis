import { buildCommand, CommandInteraction, getVariables, PermissionFlagsBits } from '../../shared';
import { toggleGame } from '../helpers';

const commandData = {
    description: 'Toggle the game on or off. (Mod && Game Category Exclusive)',
    dmPermission: false,
    memberPermissions: PermissionFlagsBits.Administrator,
    name: 'toggle'
};

export default {
    data: buildCommand(commandData),
    execute: async (interaction: CommandInteraction) => {
        const { game } = getVariables();

        if (interaction.channelId !== game) {
            return interaction.reply('I cannot oblige'); // TODO Get special random replies
        }

        await interaction.reply(await toggleGame(interaction.guild));
    }
};
