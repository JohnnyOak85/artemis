import Discord, { DiscordGuild, DiscordMember } from '../../commons/discord';
import { Api, Gamble, Log, Schedule, Time } from '../../commons/tools';

type ReminderConfig = {
    birthdays: string[];
    releases: {};
};

type ReminderEmbed = {
    _id: string;
    done?: boolean;
    event?: string;
    image?: string;
    memberId?: string;
    timestamp: number;
    type: 'birthday' | 'celebration' | 'release';
    url?: string;
};

const YEARLY_EVENTS = ['birthday', 'celebration'];
const API_URL = 'reminders';

const remindersList: string[] = [];

const getBirthdayMessage = async (nickname: string) => {
    const { birthdays } = await Api.get<ReminderConfig>(`${API_URL}/config`);

    return birthdays[Gamble.randomIndex(birthdays)].replace('§nickname', nickname);
};

const buildBirthdayEmbed = async ({ nickname, avatarURL, user: { username } }: DiscordMember) => ({
    color: 0xffd700,
    fields: {
        name: '\u200B',
        value: await getBirthdayMessage(nickname || username)
    },
    thumbnail: avatarURL(),
    title: 'HAPPY ANNIVERSARY!',
    url: 'https://www.youtube.com/watch?v=8zgz2xBrvVQ'
});

const buildCelebrationEmbed = ({ event, image }: ReminderEmbed) => ({
    color: 0x0dff00,
    fields: { name: '\u200B', value: `Today is ${event}` },
    image,
    title: 'CELEBRATION DAY!'
});

const buildReleaseEmbed = ({ image, url }: ReminderEmbed) => ({
    color: 0xff0000,
    fields: { name: '\u200B', value: '\u200B' },
    title: 'RELEASE DAY!',
    image,
    url
});

const markAsDone = (reminder: ReminderEmbed) => {
    reminder.done = true;

    Api.put(API_URL, reminder);
};

const runsOnce = (type: string) => !YEARLY_EVENTS.includes(type);

export default async ({ members, systemChannel }: DiscordGuild) => {
    try {
        const reminders = await Api.get<ReminderEmbed[]>(API_URL);

        for (const reminder of reminders) {
            if (remindersList.includes(reminder._id) || reminder.done) {
                continue;
            }

            if (Time.getTimestamp() > reminder.timestamp) {
                markAsDone(reminder);
                continue;
            }

            const callBack = async () => {
                switch (reminder.type) {
                    case 'birthday':
                        systemChannel?.send(
                            Discord.buildEmbed(
                                await buildBirthdayEmbed(
                                    await members.fetch(reminder.memberId || '')
                                )
                            )
                        );
                        break;
                    case 'celebration':
                        systemChannel?.send(Discord.buildEmbed(buildCelebrationEmbed(reminder)));
                        break;
                    case 'release':
                        systemChannel?.send(Discord.buildEmbed(buildReleaseEmbed(reminder)));

                        markAsDone(reminder);
                        break;
                }
            };

            runsOnce(reminder.type)
                ? Schedule.runOnce(reminder.timestamp, callBack)
                : Schedule.run(reminder.timestamp, callBack);

            remindersList.push(reminder._id);
        }
    } catch (error) {
        Log.error(error, 'startReminders');
        throw error;
    }
};
