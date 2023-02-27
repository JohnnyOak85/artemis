import { EmbedBuilder } from 'discord.js';

type Embed = {
    color?: number | null;
    description?: string | null;
    fields?: { name: string; value: string } | null;
    image?: string | null;
    thumbnail?: string | null;
    title?: string | null;
    url?: string | null;
};

const buildEmbed = ({
    color = null,
    description = null,
    fields = null,
    image = null,
    thumbnail = null,
    title = null,
    url = null
}: Embed) => {
    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(description)
        .setImage(image)
        .setThumbnail(thumbnail)
        .setTitle(title)
        .setURL(url);

    if (fields) {
        embed.setFields(fields);
    }

    return embed;
};

export default (embedData: Embed) => ({
    embeds: [buildEmbed(embedData)]
});
