import Discord, { DiscordGuild, DiscordMember } from '../../commons/discord';
import { Api, Gamble, Schedule } from '../../commons/tools';

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

async function buildBirthdayEmbed({ nickname, avatarURL, user: { username } }: DiscordMember) {
    const { birthdays } = await Api.get<ReminderConfig>(`${API_URL}/config`);

    return {
        color: 0xffd700,
        fields: {
            name: '\u200B',
            value: birthdays[(Gamble.random(birthdays.length), 0)].replace(
                '§nickname',
                nickname || username
            )
        },
        thumbnail: avatarURL(),
        title: 'HAPPY ANNIVERSARY!',
        url: 'https://www.youtube.com/watch?v=8zgz2xBrvVQ'
    };
}

function buildCelebrationEmbed({ event, image }: ReminderEmbed) {
    return {
        color: 0x0dff00,
        fields: { name: '\u200B', value: `Today is ${event}` },
        image,
        title: 'CELEBRATION DAY!'
    };
}

function buildReleaseEmbed({ image, url }: ReminderEmbed) {
    return {
        color: 0xff0000,
        fields: { name: '\u200B', value: '\u200B' },
        title: 'RELEASE DAY!',
        image,
        url
    };
}

const runsOnce = (type: string) => !YEARLY_EVENTS.includes(type);

export default async ({ members, systemChannel }: DiscordGuild) => {
    const reminders = await Api.get<ReminderEmbed[]>(API_URL);

    for (const reminder of reminders) {
        if (remindersList.includes(reminder._id)) {
            continue;
        }

        const callBack = async () => {
            switch (reminder.type) {
                case 'birthday':
                    systemChannel?.send(
                        Discord.buildEmbed(
                            await buildBirthdayEmbed(await members.fetch(reminder.memberId || ''))
                        )
                    );
                    break;
                case 'celebration':
                    systemChannel?.send(Discord.buildEmbed(buildCelebrationEmbed(reminder)));
                    break;
                case 'release':
                    systemChannel?.send(Discord.buildEmbed(buildReleaseEmbed(reminder)));

                    reminder.done = true;

                    Api.put(API_URL, reminder);
                    break;
            }
        };

        runsOnce(reminder.type)
            ? Schedule.runOnce(reminder.timestamp, callBack)
            : Schedule.run(reminder.timestamp, callBack);

        remindersList.push(reminder._id);
    }
};
