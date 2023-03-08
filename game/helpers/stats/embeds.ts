import Discord from '../../../commons/discord';
import { Word } from '../../../commons/tools';
import { Player } from '../player';

interface MenuData extends Player {
    avatar: string | null;
}

interface StatsData extends MenuData {
    rankName: string | undefined;
}

interface BestiaryData extends MenuData {
    monsterList: string[];
}

export default {
    achievements: ({ achievements, avatar, name }: MenuData) => {
        return Discord.buildEmbedData({
            description: achievements.length ? Word.buildList(achievements) : null,
            thumbnail: avatar,
            title: `${name}'s Achievements`
        });
    },
    bestiary: ({ avatar, bestiary, monsterList, name }: BestiaryData) => {
        const playerMonsters = bestiary.filter(monster => monsterList.includes(monster));

        return Discord.buildEmbedData({
            description: playerMonsters.length ? Word.buildList(playerMonsters) : null,
            footer: { text: `${playerMonsters.length}/${monsterList.length}` },
            thumbnail: avatar,
            title: `${name}'s Bestiary`
        });
    },
    stats: ({
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

        return Discord.buildEmbedData({
            description: Word.buildList(stats),
            fields: {
                name: 'Records',
                value: `Wins: ${wins} | Losses: ${losses}`
            },
            thumbnail: avatar,
            title: `${name} | Level ${level} ${rankName}`
        });
    }
};
