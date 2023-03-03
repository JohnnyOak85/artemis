import { DiscordChannel } from '../../commons/discord';
import { Log } from '../../commons/tools';
import { getPlayer, PlayerData } from './player';
import gameStore from './stores/game.store';
import messageStore from './stores/message.store';
import monsterStore from './stores/monster.store';

export const engageBattle = async (playerData: PlayerData, channel: DiscordChannel) => {
    try {
        const monster = monsterStore.getMonster();
        const player = await getPlayer(playerData);

        if (!monster) return;

        gameStore.stop();
        messageStore.deleteMessage();

        // gameStore.restart();
    } catch (error) {
        Log.error(error, 'engageBattle');
        throw error;
    }
};
