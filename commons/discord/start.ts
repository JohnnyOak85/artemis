import { BitFieldResolvable, Client, GatewayIntentsString } from 'discord.js';
import { DiscordEvent } from '.';
import { Environment } from '../tools';

export default (
    events: DiscordEvent[],
    intents: BitFieldResolvable<GatewayIntentsString, number>[]
) => {
    Environment.start();

    const { token } = Environment.get();
    const client = new Client({ intents });

    client.login(token);

    for (const event of events) {
        client.on(event.name, (...args) => event.execute(...args));
    }
};
