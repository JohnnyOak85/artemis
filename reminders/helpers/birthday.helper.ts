import { getData, getEmbedObject, GuildMember, randomIndex } from '../../shared';

type ReminderConfig = {
    birthdays: string[];
    releases: {};
};

const getBirthdayMessage = async (nickname: string) => {
    const { birthdays } = await getData<ReminderConfig>('reminders/config');

    return birthdays[randomIndex(birthdays)].replace('§nickname', nickname);
};

const buildBirthdayEmbed = async ({ nickname, avatarURL, user: { username } }: GuildMember) => ({
    color: 0xffd700,
    fields: {
        name: '\u200B',
        value: await getBirthdayMessage(nickname || username)
    },
    thumbnail: avatarURL(),
    title: 'HAPPY ANNIVERSARY!',
    url: 'https://www.youtube.com/watch?v=8zgz2xBrvVQ'
});

export const getBirthdayEmbed = async (member: GuildMember) =>
    getEmbedObject([await buildBirthdayEmbed(member)]);
