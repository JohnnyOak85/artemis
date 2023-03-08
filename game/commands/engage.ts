import Discord, { DiscordChannel, DiscordCommandInteraction } from '../../commons/discord';
import { Environment } from '../../commons/tools';
import { engageBattle } from '../helpers/battle';

const commandData = {
    description: 'Attack a spawned monster! (Game Category Exclusive)',
    dmPermission: false,
    name: 'engage'
};

export default {
    data: Discord.buildCommand(commandData),
    execute: async (interaction: DiscordCommandInteraction) => {
        const { game } = Environment.get();

        if (
            interaction.channelId !== game ||
            interaction.channel?.type !== Discord.ChannelTypes.text
        ) {
            return interaction.reply('I cannot oblige'); // TODO Get special random replies
        }

        const roles = Discord.getPlayerRoles(interaction.member);

        const player = {
            id: interaction.user.id,
            name: interaction.user.username,
            titles: roles.map(({ id }) => id)
        };

        engageBattle(player, interaction.channel as DiscordChannel);

        return interaction.reply('attack');
    }
};
