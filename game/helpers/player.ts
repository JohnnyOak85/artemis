import { Dictionary } from '../../commons';
import { Api, Gamble } from '../../commons/tools';
import stats from './stats';
import { Battler } from './stores/fighter.store';

interface PlayerDoc {
    achievements: string[];
    attributes: Dictionary<number>;
    attack: number;
    bestiary: string[];
    defense: number;
    health: number;
    level: number;
    losses: number;
    luck: number;
    messages: number;
    name: string;
    rank: string;
    wins: number;
}

export interface Player extends Battler, PlayerDoc {}

export type PlayerData = {
    id: string;
    name: string;
    titles: string[];
};

type PlayerRanks = Dictionary<string>;

const URL = 'game/player';

const getPlayerRank = async (titles: string[]) => {
    const ranks = await Api.get<PlayerRanks>(`${URL}/ranks`);
    const playerRanks = titles.filter(title => !!ranks[title]);

    return playerRanks[Gamble.randomIndex(playerRanks)];
};

export const getPlayer = async ({ id, name, titles }: PlayerData): Promise<Player> => {
    const player = await Api.get<PlayerDoc>(URL, { player: id });
    const { attack, defense, health } = await stats.getPlayerBaseStats();

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

export const savePlayer = async ({ boost, damage, id, originalHealth, type, ...player }: Player) =>
    Api.put<PlayerDoc>(URL, player);
