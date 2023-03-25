import { getBirthdayEmbed, getCelebrationEmbed, getReleaseEmbed } from '.';
import { getData, getTimestamp, Guild, logError, putData, runJob, runJobOnce } from '../../shared';
import { ReminderEmbed } from '../types';

const YEARLY_EVENTS = ['birthday', 'celebration'];
const API_URL = 'reminders';

const remindersList: string[] = [];

const markAsDone = (reminder: ReminderEmbed) => {
    reminder.done = true;

    putData(API_URL, reminder.id, reminder);
};

const runsOnce = (type: string) => !YEARLY_EVENTS.includes(type);

export const startReminders = async ({ members, systemChannel }: Guild) => {
    try {
        const reminders = await getData<ReminderEmbed[]>(API_URL);

        for (const reminder of reminders) {
            if (remindersList.includes(reminder.id) || reminder.done) {
                continue;
            }

            if (getTimestamp() > reminder.timestamp) {
                markAsDone(reminder);
                continue;
            }

            const callBack = async () => {
                switch (reminder.type) {
                    case 'birthday':
                        systemChannel?.send(
                            await getBirthdayEmbed(await members.fetch(reminder.memberId!))
                        );
                        break;
                    case 'celebration':
                        systemChannel?.send(getCelebrationEmbed(reminder));
                        break;
                    case 'release':
                        systemChannel?.send(getReleaseEmbed(reminder));

                        markAsDone(reminder);
                        break;
                }
            };

            runsOnce(reminder.type)
                ? runJobOnce(reminder.timestamp, callBack)
                : runJob(reminder.timestamp, callBack);

            remindersList.push(reminder.id);
        }
    } catch (error) {
        logError(error, 'startReminders');
        throw error;
    }
};
