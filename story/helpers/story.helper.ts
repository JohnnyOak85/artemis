import {
    Dictionary,
    getData,
    getEmbedObject,
    PUNCTUATION,
    quirkSpeech,
    random,
    randomIndex,
    replaceAll,
    rollDice,
    startsWithAny
} from '../../shared';

type Decorator = Dictionary<string[]>;

const API_URL = 'story';
const MAX_YEAR = 100;
const MIN_YEAR = 2;

const getDecoration = (decorator: string[]) => decorator[randomIndex(decorator)];
const getDecorators = async () => await getData<Decorator>(`${API_URL}/decorators`);
const getStoryBlocks = async () => await getData<string[][]>(`${API_URL}/blocks`);
const getCost = () => {
    const power = parseInt('1'.padEnd(random(5), '0'), 10);

    return (random() * power).toString();
};

const chooseText = (block: string[]) => block[randomIndex(block)];
const addSpace = (text: string) => (startsWithAny(text, PUNCTUATION) ? text : ` ${text}`);

const constructBlock = (block: string[], decorator: Decorator, protagonist: string) => {
    let text = addSpace(chooseText(block));

    for (const key in decorator) {
        text = replaceAll(text, `§${key}`, getDecoration(decorator[key]));
    }

    text = replaceAll(text, '§protagonist', protagonist);
    text = replaceAll(text, '§cost', getCost());
    text = replaceAll(text, '§years', `${random(MAX_YEAR, MIN_YEAR)}`);

    return text;
};

export const buildStory = async (name: string) => {
    let title = 'Story of the Week ';
    let value = '';

    const blocks = await getStoryBlocks();
    const decorators = await getDecorators();

    for (const block of blocks) {
        value += constructBlock(block, decorators, name);
    }

    if (rollDice()) {
        const [titleAlt, valueAlt] = (await quirkSpeech(`${title}§§${value}`)).split('§§');
        title = titleAlt;
        value = valueAlt;
    }

    return getEmbedObject([{ title, fields: { name, value } }]);
};
