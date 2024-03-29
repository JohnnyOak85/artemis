import { EmbedBuilder } from 'discord.js';

type Embed = {
    color?: number | null;
    description?: string | null;
    fields?: { name: string; value: string } | null;
    footer?: { text: string } | null;
    image?: string | null;
    thumbnail?: string | null;
    title?: string | null;
    url?: string | null;
};

export const buildEmbed = ({
    color = null,
    description = null,
    fields = null,
    footer = null,
    image = null,
    thumbnail = null,
    title = null,
    url = null
}: Embed) => {
    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(description)
        .setFooter(footer)
        .setImage(image)
        .setThumbnail(thumbnail)
        .setTitle(title)
        .setURL(url);

    if (fields) {
        embed.setFields(fields);
    }

    return embed;
};

export const getEmbeds = (embedList: Embed[]) => embedList.map(embedData => buildEmbed(embedData));

export const getEmbedObject = (embedList: Embed[]) => ({ embeds: getEmbeds(embedList) });
