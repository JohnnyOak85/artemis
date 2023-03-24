import Discord, { DiscordCommandInteraction } from '../../commons/discord';

const commandData = {
    description: 'List all banned members. (Moderation Exclusive)',
    dmPermission: false,
    memberPermissions: Discord.Permissions.bans,
    name: 'bans'
};

export default {
    data: Discord.buildCommand(commandData),
    execute: async (interaction: DiscordCommandInteraction) => {
        const bans = await interaction.guild?.bans.fetch();

        bans?.forEach(ban => {
            console.log(ban.user.username, ban.reason, ban.user.id);
        });
    }
};
