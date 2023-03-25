import { Events, getCommand, Interaction } from '../../shared';

export const InteractionCreateEvent = {
    name: Events.InteractionCreate,
    execute: async (interaction: Interaction) => {
        // TODO List bans as ephemeral
        // TODO When you list a person's warnings, have info if banned
        // TODO Have a button to unban the person

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

            throw error;
        }
    }
};
