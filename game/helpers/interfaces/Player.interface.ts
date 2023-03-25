import { Battler } from '.';
import { Dictionary } from '../../../shared';

export interface PlayerDoc {
    _id?: string;
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
