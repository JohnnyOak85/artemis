import { Dictionary, getData, putData, randomIndex } from '../../shared';
import { Player, PlayerData, PlayerDoc } from './interfaces';
import { getPlayerBaseStats } from './stats';

type PlayerRanks = Dictionary<string>;

const URL = 'game/players';

const getPlayerRank = async (titles: string[]) => {
    const ranks = await getData<PlayerRanks>(`${URL}/ranks`);
    const playerRanks = titles.filter(title => !!ranks[title]);

    return playerRanks[randomIndex(playerRanks)];
};

export const getPlayer = async ({ id, name, titles }: PlayerData): Promise<Player> => {
    const player = await getData<PlayerDoc>(`${URL}/${id}`);
    const { attack, defense, health } = await getPlayerBaseStats();

    return {
        achievements: player?.achievements || [],
        attributes: player?.attributes || {},
        attack: player?.attack || attack,
        bestiary: player?.bestiary || [],
        defense: player?.defense || defense,
        health: player?.health || health + 50,
        id,
        level: player?.level || 1,
        losses: player?.losses || 0,
        luck: player?.luck || 1,
        messages: player?.messages || 0,
        name: player?.name || name,
        rank: player?.rank || (await getPlayerRank(titles)),
        wins: player?.wins || 0
    };
};

export const getPlayers = async () => getData<PlayerDoc[]>(`${URL}/all`);

export const savePlayer = async ({ boost, damage, id, originalHealth, type, ...player }: Player) =>
    putData<PlayerDoc>(URL, player._id!, player);
