import {
    buildCommand,
    CommandInteraction,
    getMemberRoles,
    getVariables,
    isText,
    TextChannel
} from '../../shared';
import { engageBattle } from '../helpers';

const commandData = {
    description: 'Attack a spawned monster! (Game Category Exclusive)',
    dmPermission: false,
    name: 'engage'
};

export default {
    data: buildCommand(commandData),
    execute: async (interaction: CommandInteraction) => {
        const { game } = getVariables();

        if (interaction.channelId !== game || isText(interaction.channel?.type!)) {
            return interaction.reply('I cannot oblige'); // TODO Get special random replies
        }

        const roles = getMemberRoles(interaction.member);

        const player = {
            id: interaction.user.id,
            name: interaction.user.username,
            titles: roles.map(({ id }) => id)
        };

        engageBattle(player, interaction.channel as TextChannel);

        return interaction.reply('attack');
    }
};
