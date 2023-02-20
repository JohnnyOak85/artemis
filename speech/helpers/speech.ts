import { Dictionary } from '../../commons';
import Discord, { DiscordChannel, DiscordMessage } from '../../commons/discord';
import { Api, Gamble, Log, Quirk } from '../../commons/tools';

const getGreeting = async () => {
    const greetings = await Api.get<string[]>('greetings');

    return greetings[Gamble.randomIndex(greetings)];
};

const getPrediction = async () => {
    const predictions = await Api.get<string[]>('predictions');

    return predictions[Gamble.randomIndex(predictions)];
};

const getReaction = async (word: string) => {
    const reactions = await Api.get<Dictionary<string>>('reactions');
    return reactions[word];
};

const getResponse = async (word: string) => {
    const responses = await Api.get<Dictionary<string>>('responses');
    return responses[word];
};

export const checkMessage = async (message: DiscordMessage) => {
    if (message.channel.type === Discord.ChannelTypes.dm || message.author.bot || !message.guild)
        return;

    try {
        const words = message.content.toLowerCase().split(' ');

        const mentioned = message.mentions.has(message.client.user.id);
        const questioned = message.content.endsWith('?');

        const willReact = Gamble.roshambo();
        const willRespond = Gamble.roshambo();
        const willPredict = Gamble.roshambo();

        let reacted = false;
        let responded = false;

        if (questioned && (mentioned || willPredict)) {
            message.reply(await Quirk.try(await getPrediction()));

            responded = true;
        }

        for (const word of words) {
            if (reacted && responded) break;

            if (!reacted && willReact) {
                const reaction = await getReaction(word);

                if (!reaction) continue;

                message.react(reaction);
                reacted = true;
            }

            if (!responded && willRespond) {
                const response = await getResponse(word);

                if (!response) continue;

                if (message.channel instanceof DiscordChannel) {
                    message.channel.send(response);
                }

                responded = true;
            }
        }

        if (!responded && mentioned) {
            message.reply(await Quirk.try(await getGreeting()));
        }
    } catch (error) {
        Log.error(error, 'checkMessage');
        throw error;
    }
};
