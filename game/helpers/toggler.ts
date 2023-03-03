import Discord, { DiscordGuild } from '../../commons/discord';
import { Environment, Log } from '../../commons/tools';
import spawnMonster from './spawner';
import jobStore from './stores/job.store';
import messageStore from './stores/message.store';
import toggleStore from './stores/toggle.store';

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
            jobStore.stop();

            reply = 'Ending the game';
        } else {
            jobStore.start(async () => {
                messageStore.clearMessage(); // TODO Only if not engaged
                const message = await channel.send(await spawnMonster()); // TODO Only if no battle is on going
                messageStore.saveMessage(message);
            });
        }

        toggleStore.toggle();

        return reply;
    } catch (error) {
        Log.error(error, 'toggler');
        throw error;
    }
};
