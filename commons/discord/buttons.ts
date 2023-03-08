import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentEmojiResolvable } from 'discord.js';
import buttonStyles from './button-styles';

type ButtonData = {
    emoji?: ComponentEmojiResolvable;
    id: string;
    label: string;
    style?: ButtonStyle;
};

export default {
    buildButton: ({ id, label, style = buttonStyles.secondary, emoji }: ButtonData) => {
        const button = new ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);

        if (emoji) {
            button.setEmoji(emoji);
        }

        return button;
    },
    buildButtonRow: (buttons: ButtonBuilder[]) => [
        new ActionRowBuilder<ButtonBuilder>().addComponents(buttons)
    ]
};
