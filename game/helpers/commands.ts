import { Collector } from '../../commons';
import Discord, { DiscordCommandBody, DiscordCommandInteraction } from '../../commons/discord';
import commands from '../commands';

interface Command {
    execute: (interaction: DiscordCommandInteraction) => any;
}

const commandCollection = new Collector<Command>();

export const registerCommands = async (token: string, clientId: string, guildId: string) => {
    try {
        const body: DiscordCommandBody[] = [];

        for (const { data, execute } of commands) {
            commandCollection.put(data.name, { execute });
            body.push(data.toJSON());
        }

        Discord.registerCommand({ body, clientId, guildId, token });
    } catch (error) {
        console.log('registerCommands',error);
    }
};

export const getCommand = (commandName: string) => commandCollection.get(commandName);
