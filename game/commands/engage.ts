import Discord, { DiscordChannel, DiscordCommandInteraction } from '../../commons/discord';
import { engageBattle } from '../helpers/battle';

export default {
    data: Discord.buildCommand('engage', 'Attack a spawned monster!'),
    execute: async (interaction: DiscordCommandInteraction) => {
        if (interaction.channel?.type !== Discord.ChannelTypes.text) {
            return interaction.reply('I cannot oblige');
        }

        const roles = Discord.getRoles(interaction.member);

        const player = {
            id: interaction.user.id,
            name: interaction.user.username,
            titles: roles.map(({ id }) => id)
        };

        engageBattle(player, interaction.channel as DiscordChannel);

        return interaction.reply('attack');
    }
};
