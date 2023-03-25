import { BitFieldResolvable, Client, GatewayIntentsString } from 'discord.js';
import { DiscordEvent } from '.';
import { getVariables, logInfo } from '../tools';

export const start = (
    events: DiscordEvent[],
    intents: BitFieldResolvable<GatewayIntentsString, number>[],
    module: string
) => {
    const { token } = getVariables();
    const client = new Client({ intents });

    client.login(token);

    for (const event of events) {
        client.on(event.name, (...args) => event.execute(...args));
    }

    logInfo(module, 'Module started');
    console.log('Module started');
};
