import { EmbedBuilder } from 'discord.js';

type Embed = {
    color?: number | null;
    description?: string | null;
    fields: { name: string; value: string };
    image?: string | null;
    thumbnail?: string | null;
    title?: string | null;
    url?: string | null;
};

export default ({
    color = null,
    description = null,
    fields,
    image = null,
    thumbnail = null,
    title = null,
    url = null
}: Embed) => ({
    embeds: [
        new EmbedBuilder()
            .setColor(color)
            .setDescription(description)
            .setFields(fields)
            .setImage(image)
            .setThumbnail(thumbnail)
            .setTitle(title)
            .setURL(url)
    ]
});
