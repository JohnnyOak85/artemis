import { Dictionary } from '../../commons';
import Discord from '../../commons/discord';
import { Api, Gamble, Quirk, Word } from '../../commons/tools';

type Decorator = Dictionary<string[]>;

const API_URL = 'story';
const MAX_YEAR = 100;
const MIN_YEAR = 2;

const getDecoration = (decorator: string[]) => decorator[Gamble.randomIndex(decorator)];
const getDecorators = async () => await Api.get<Decorator>(`${API_URL}/decorators`);
const getStoryBlocks = async () => await Api.get<string[][]>(`${API_URL}/blocks`);
const getCost = () => {
    const power = parseInt('1'.padEnd(Gamble.random(5), '0'), 10);

    return (Gamble.random() * power).toString();
};

const chooseText = (block: string[]) => block[Gamble.randomIndex(block)];
const addSpace = (text: string) => (Word.startsWithAny(text, Word.PUNCTUATION) ? text : ` ${text}`);

const constructBlock = (block: string[], decorator: Decorator, protagonist: string) => {
    let text = addSpace(chooseText(block));

    for (const key in decorator) {
        text = Word.replaceAll(text, `§${key}`, getDecoration(decorator[key]));
    }

    text = Word.replaceAll(text, '§protagonist', protagonist);
    text = Word.replaceAll(text, '§cost', getCost());
    text = Word.replaceAll(text, '§years', `${Gamble.random(MAX_YEAR, MIN_YEAR)}`);

    return text;
};

export default async (name: string) => {
    let title = 'Story of the Week ';
    let value = '';

    const blocks = await getStoryBlocks();
    const decorators = await getDecorators();

    for (const block of blocks) {
        value += constructBlock(block, decorators, name);
    }

    if (Gamble.rollDice()) {
        const [titleAlt, valueAlt] = (await Quirk.get(`${title}§§${value}`)).split('§§');
        title = titleAlt;
        value = valueAlt;
    }

    return Discord.buildEmbed({ title, fields: { name, value } });
};
