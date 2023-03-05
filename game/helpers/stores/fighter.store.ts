import { Collector } from '../../../commons';
import { Player } from '../player';
import { Monster } from './monster.store';

export interface Fighter extends Monster, Player {}

export interface Battler {
    attack: number;
    boost?: number;
    damage?: number;
    defense: number;
    health: number;
    id: string;
    level: number;
    luck: number;
    originalHealth?: number;
    type?: string;
}

const fighterStore = new Collector<Fighter>();
const winnerStore = new Collector<Player>();
const loserStore = new Collector<Player>();

const winnerKey = 'winner';
const loserKey = 'loser';

export default {
    getFighter: (id: string) => ({ ...fighterStore.get(id) } as Fighter),
    getLoser: () => loserStore.get(loserKey),
    getWinner: () => winnerStore.get(winnerKey),
    storeFighter: (player: Monster | Player) => fighterStore.put(player.id, player as Fighter),
    storeLoser: (loser: Fighter) => {
        if (loser.type === 'player') {
            loserStore.put(loserKey, loser as Player);
        } else {
            loserStore.delete(loserKey);
        }
    },
    storeWinner: (winner: Fighter) => {
        if (winner.type === 'player') {
            winnerStore.put(winnerKey, winner as Player);
        } else {
            winnerStore.delete(winnerKey);
        }
    }
};
