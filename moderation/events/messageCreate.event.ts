import { Events, Message } from '../../shared';

export const MessageCreateEvent = {
    name: Events.MessageCreate,
    execute: async (message: Message<true>) => {
        const guild = message.guild;

        const bans = await guild?.bans.fetch();

        /* TODO
        For each ban, construct a ban string with username, reason and id.
        Reply to issuer of the command
        */
        bans?.forEach(ban => {
            console.log(ban.user.username, ban.reason, ban.user.id);
        });

        /* TODO
        To remove a ban, it needs a user id.
        Get user id from list of bans
        */
        guild?.bans.remove('');
    }
};
