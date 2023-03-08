import Discord, { DiscordInteraction } from '../../commons/discord';
import { getCommand } from '../helpers/commands';
import { buildMenu } from '../helpers/stats/menu';

export default {
    name: Discord.Events.interaction,
    execute: async (interaction: DiscordInteraction) => {
        if (interaction.isButton()) {
            await interaction.deferUpdate();

            const reply = await buildMenu(interaction, interaction.customId);

            await interaction.editReply(reply);

            return;
        }

        if (!interaction.isChatInputCommand()) return;

        const command = getCommand(interaction.commandName);

        try {
            if (!command) {
                interaction.reply({
                    content: `No command matching ${interaction.commandName} was found.`,
                    ephemeral: true
                });

                return;
            }

            command.execute(interaction);
        } catch (error) {
            interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    }
};
