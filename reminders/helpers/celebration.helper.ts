import { getEmbedObject } from '../../shared';
import { ReminderEmbed } from '../types';

const buildCelebrationEmbed = ({ event, image }: ReminderEmbed) => ({
    color: 0x0dff00,
    fields: { name: '\u200B', value: `Today is ${event}` },
    image,
    title: 'CELEBRATION DAY!'
});

export const getCelebrationEmbed = (embed: ReminderEmbed) =>
    getEmbedObject([buildCelebrationEmbed(embed)]);
