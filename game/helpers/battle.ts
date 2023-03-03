import { DiscordChannel } from '../../commons/discord';
import { Log } from '../../commons/tools';
import { getPlayer, PlayerData } from './player';
import monsterStore from './stores/monster.store';

export const engageBattle = async (playerData: PlayerData, channel: DiscordChannel) => {
    try {
        const monster = monsterStore.getMonster();
        const player = await getPlayer(playerData);

        console.log(monster);
        if (!monster) return;
    } catch (error) {
        Log.error(error, 'engageBattle');
        throw error;
    }
};
