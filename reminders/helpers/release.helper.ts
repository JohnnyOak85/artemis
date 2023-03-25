import { getEmbedObject } from '../../shared';
import { ReminderEmbed } from '../types';

const buildReleaseEmbed = ({ image, url }: ReminderEmbed) => ({
    color: 0xff0000,
    fields: { name: '\u200B', value: '\u200B' },
    title: 'RELEASE DAY!',
    image,
    url
});

export const getReleaseEmbed = (embed: ReminderEmbed) => getEmbedObject([buildReleaseEmbed(embed)]);
