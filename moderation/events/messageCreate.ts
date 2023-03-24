import Discord, { DiscordMessage } from '../../commons/discord';

export default {
    name: Discord.Events.message,
    execute: async (message: DiscordMessage) => {
        const guild = message.guild;

        const bans = await guild?.bans.fetch();

        /*
        For each ban, construct a ban string with username, reason and id.
        Reply to issuer of the command
        */
        bans?.forEach(ban => {
            console.log(ban.user.username, ban.reason, ban.user.id);
        });

        /*
        To remove a ban, it needs a user id.
        Get user id from list of bans
        */
        guild?.bans.remove('');
    }
};
