import { buildCommand, CommandInteraction, PermissionFlagsBits } from '../../shared';
import { warnUser } from '../helpers';

const commandData = {
    description: 'Issue a warning to a member for misbehavior. (Moderation Exclusive)',
    dmPermission: false,
    memberPermissions: PermissionFlagsBits.BanMembers,
    name: 'warn',
    options: [
        {
            name: 'target',
            description: 'The member to warn',
            required: true,
            type: 'user'
        },
        {
            name: 'reason',
            description: 'The reason for the warning',
            type: 'string'
        }
    ]
};

export default {
    data: buildCommand(commandData),
    execute: async (interaction: CommandInteraction) => {
        const [user, string] = commandData.options;

        interaction.reply({
            content: await warnUser(interaction, user.name, string.name),
            ephemeral: true
        });

        // const bans = await interaction.guild?.bans.fetch();

        // bans?.forEach(ban => {
        //     console.log(ban.user.username, ban.reason, ban.user.id);
        // });
    }
};
