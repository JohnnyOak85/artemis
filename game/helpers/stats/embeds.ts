import { buildList, getEmbedObject } from '../../../shared';
import { Player } from '../interfaces';

interface MenuData extends Player {
    avatar: string | null;
}

interface StatsData extends MenuData {
    rankName: string | undefined;
}

interface BestiaryData extends MenuData {
    monsterList: string[];
}

export const getAchievementsEmbed = ({ achievements, avatar, name }: MenuData) =>
    getEmbedObject([
        {
            description: achievements.length ? buildList(achievements) : null,
            thumbnail: avatar,
            title: `${name}'s Achievements`
        }
    ]);

export const getBestiaryEmbed = ({ avatar, bestiary, monsterList, name }: BestiaryData) => {
    const playerMonsters = bestiary.filter(monster => monsterList.includes(monster));

    return getEmbedObject([
        {
            description: playerMonsters.length ? buildList(playerMonsters) : null,
            footer: { text: `${playerMonsters.length}/${monsterList.length}` },
            thumbnail: avatar,
            title: `${name}'s Bestiary`
        }
    ]);
};

export const getStatsEmbed = ({
    attack,
    avatar,
    defense,
    health,
    level,
    losses,
    luck,
    name,
    rankName,
    wins
}: StatsData) => {
    const stats = [
        `Health: ${health}`,
        `Attack: ${attack}`,
        `Defense: ${defense}`,
        `Luck: ${luck}`
    ];

    return getEmbedObject([
        {
            description: buildList(stats),
            fields: {
                name: 'Records',
                value: `Wins: ${wins} | Losses: ${losses}`
            },
            thumbnail: avatar,
            title: `${name} | Level ${level} ${rankName}`
        }
    ]);
};
