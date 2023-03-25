import { getChannel, getVariables, Guild, logError, TextChannel } from '../../shared';
import { spawnMonster } from './spawner';
import { GameStore, MessageStore, ToggleStore } from './stores';

const startGame = (channel: TextChannel) => {
    if (GameStore.hasGame()) {
        GameStore.restart();
    } else {
        GameStore.start(async () => {
            MessageStore.clearMessage();
            const message = await channel.send(await spawnMonster());
            MessageStore.saveMessage(message);
        });
    }
};

export const toggleGame = async (guild: Guild | null) => {
    try {
        if (!guild) {
            throw new Error('No guild');
        }

        const { game } = getVariables();
        const isRunning = ToggleStore.isRunning();
        const channel = await getChannel(guild, game);
        let reply = 'Starting the game.';

        if (!channel) {
            throw new Error('No channel');
        }

        if (isRunning) {
            GameStore.stop();

            reply = 'Ending the game';
        } else {
            startGame(channel);
        }

        ToggleStore.toggle();

        return reply;
    } catch (error) {
        logError(error, 'toggler');
        throw error;
    }
};
