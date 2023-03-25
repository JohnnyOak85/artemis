import { Collector } from '../../../shared';
import { Fighter, Monster, Player } from '../interfaces';

const fighterStore = new Collector<Fighter>();
const winnerStore = new Collector<Player>();
const loserStore = new Collector<Player>();

const winnerKey = 'winner';
const loserKey = 'loser';

export const FighterStore = {
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
