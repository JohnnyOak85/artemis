import { buildCommand, CommandInteraction, PermissionFlagsBits } from '../../shared';

const commandData = {
    description: 'List all banned members. (Moderation Exclusive)',
    dmPermission: false,
    memberPermissions: PermissionFlagsBits.BanMembers,
    name: 'bans'
};

export default {
    data: buildCommand(commandData),
    execute: async (interaction: CommandInteraction) => {
        const bans = await interaction.guild?.bans.fetch();

        bans?.forEach(ban => {
            console.log(ban.user.username, ban.reason, ban.user.id);
        });
    }
};
