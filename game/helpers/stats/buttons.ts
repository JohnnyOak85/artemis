import { buildButton } from '../../../shared';

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

export const getAchievementsButton = () => buildButton(achievementsButton);
export const getBestiaryButton = () => buildButton(bestiaryButton);
export const getStatsButton = () => buildButton(statsButton);
