import { BitFieldResolvable, Client, GatewayIntentsString } from 'discord.js';
import { Event } from '.';
import { getVariables } from '../tools';

export const start = (
    events: Event[],
    intents: BitFieldResolvable<GatewayIntentsString, number>[]
) => {
    const { token } = getVariables();
    const client = new Client({ intents });

    client.login(token);

    for (const event of events) {
        client.on(event.name, (...args) => event.execute(...args));
    }

    console.log('Module started');
};
