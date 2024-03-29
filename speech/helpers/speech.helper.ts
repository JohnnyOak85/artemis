import {
    Dictionary,
    getData,
    isDM,
    logError,
    Message,
    randomIndex,
    roshambo,
    TextChannel,
    tryToQuirkSpeech
} from '../../shared';

const prefix = 'speech/replies';

const getGreeting = async () => {
    const greetings = await getData<string[]>(`${prefix}/greetings`);

    return greetings[randomIndex(greetings)];
};

const getPrediction = async () => {
    const predictions = await getData<string[]>(`${prefix}/predictions`);

    return predictions[randomIndex(predictions)];
};

const getReaction = async (word: string) => {
    const reactions = await getData<Dictionary<string>>(`${prefix}/reactions`);
    return reactions[word];
};

const getResponse = async (word: string) => {
    const responses = await getData<Dictionary<string>>(`${prefix}/responses`);
    return responses[word];
};

export const checkMessage = async (message: Message<true>) => {
    if (isDM(message.channel.type) || message.author.bot || !message.guild) return;

    try {
        const words = message.content.toLowerCase().split(' ');

        const mentioned = message.mentions.has(message.client.user.id);
        const questioned = message.content.endsWith('?');

        const willReact = roshambo();
        const willRespond = roshambo();
        const willPredict = roshambo();

        let reacted = false;
        let responded = false;

        if (questioned && (mentioned || willPredict)) {
            message.reply(await tryToQuirkSpeech(await getPrediction()));

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

                if (message.channel instanceof TextChannel) {
                    message.channel.send(response);
                }

                responded = true;
            }
        }

        if (!responded && mentioned) {
            message.reply(await tryToQuirkSpeech(await getGreeting()));
        }
    } catch (error) {
        logError(error, 'speech/checkMessage');
        throw error;
    }
};
