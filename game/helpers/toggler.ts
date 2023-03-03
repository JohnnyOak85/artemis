import Discord, { DiscordChannel, DiscordGuild } from '../../commons/discord';
import { Environment, Log } from '../../commons/tools';
import spawnMonster from './spawner';
import gameStore from './stores/game.store';
import messageStore from './stores/message.store';
import toggleStore from './stores/toggle.store';

const startGame = (channel: DiscordChannel) => {
    if (gameStore.hasGame()) {
        gameStore.restart();
    } else {
        gameStore.start(async () => {
            messageStore.clearMessage();
            const message = await channel.send(await spawnMonster());
            messageStore.saveMessage(message);
        });
    }
};

export default async (guild: DiscordGuild | null) => {
    try {
        if (!guild) {
            throw new Error('No guild');
        }

        const { game } = Environment.get();
        const isRunning = toggleStore.isRunning();
        const channel = await Discord.getChannel(guild, game);
        let reply = 'Starting the game.';

        if (!channel) {
            throw new Error('No channel');
        }

        if (isRunning) {
            gameStore.stop();

            reply = 'Ending the game';
        } else {
            startGame(channel);
        }

        toggleStore.toggle();

        return reply;
    } catch (error) {
        Log.error(error, 'toggler');
        throw error;
    }
};
