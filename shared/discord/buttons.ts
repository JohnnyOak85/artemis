import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentEmojiResolvable } from 'discord.js';

const ButtonStyles = {
    secondary: ButtonStyle.Secondary
};

type ButtonData = {
    emoji?: ComponentEmojiResolvable;
    id: string;
    label: string;
    style?: ButtonStyle;
};

export const buildButton = ({ id, label, style = ButtonStyles.secondary, emoji }: ButtonData) => {
    const button = new ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);

    if (emoji) {
        button.setEmoji(emoji);
    }

    return button;
};

export const buildButtonRow = (buttons: ButtonBuilder[]) => [
    new ActionRowBuilder<ButtonBuilder>().addComponents(buttons)
];
