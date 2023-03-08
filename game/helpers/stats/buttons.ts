import Discord from '../../../commons/discord';

const achievementsButton = {
    emoji: '👑',
    id: 'achievements',
    label: 'Achievements'
};

const bestiaryButton = {
    emoji: '🐉',
    id: 'bestiary',
    label: 'Bestiary'
};

const statsButton = {
    emoji: '⚔',
    id: 'stats',
    label: 'Stats'
};

export default {
    achievements: () => Discord.buildButton(achievementsButton),
    bestiary: () => Discord.buildButton(bestiaryButton),
    stats: () => Discord.buildButton(statsButton)
};
