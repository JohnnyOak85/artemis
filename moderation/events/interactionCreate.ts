import Discord, { DiscordInteraction } from '../../commons/discord';

export default {
    name: Discord.Events.interaction,
    execute: async (interaction: DiscordInteraction) => {
        // List bans as ephemeral
        // When you list a person's warnings, have info if banned
        // Have a button to unban the person

        if (!interaction.isChatInputCommand()) return;

        const command = Discord.getCommand(interaction.commandName);

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
