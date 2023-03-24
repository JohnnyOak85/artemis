import { Api, Gamble, Word } from '.';
import { StringCallback } from '..';

type QuirkEntry = {
    find: string;
    replace: string;
    type?: 'letter' | 'punctuation' | 'random-suffix' | 'suffix';
};

const separator = '|';
const chance = 45;

const iterateFind = (find: string, callback: StringCallback) => {
    find.split(separator).forEach(callback);
};

const iteratePunctuation = (callback: StringCallback) => {
    Word.PUNCTUATION.forEach(callback);
};

const iterateText = (text: string, sep = separator, callback: StringCallback) =>
    text.split(sep).map(callback).join(sep);

const addSpaces = (text: string) =>
    text.includes(separator)
        ? text
              .split(separator)
              .map(word => ` ${word} `)
              .join(separator)
        : text;

const addSuffix = (text: string, find: string, replace: string) =>
    iterateText(text, ' ', word => {
        if (word.length < 4) return word;

        iterateFind(find, letter => {
            iteratePunctuation(point => {
                word = Word.replaceAll(word, `${letter}[${point}]`, `${letter}${replace}${point}`);

                if (word.endsWith(letter)) {
                    word = `${word}${replace}`;
                }
            });
        });

        return word;
    });

const addSuffixRandom = (text: string, find: string, replace: string) =>
    Gamble.random() < chance ? addSuffix(text, find, replace) : text;

const replaceLetter = (text: string, find: string, replace: string) =>
    Word.replaceAllCase(text, find, replace);

const replacePunctuation = (text: string, find: string, replace: string) => {
    iterateFind(find, word => {
        text = Word.replaceLast(text, `[${word}] `, `${word} ${replace}`);
    });

    return text;
};

const replaceWord = (text: string, find: string, replace: string) => {
    const spacedFind = addSpaces(find);

    return Word.replaceAll(text, spacedFind, spacedFind.includes(' ') ? ` ${replace} ` : replace);
};

const addQuirks = async (text: string) => {
    const quirkList = await Api.get<QuirkEntry[][]>('speech/quirks');
    const quirks = quirkList[Gamble.randomIndex(quirkList)];

    text = `${text} `;

    for (const { find, replace, type } of quirks) {
        switch (type) {
            case 'letter':
                text = replaceLetter(text, find, replace);
                break;

            case 'punctuation':
                text = replacePunctuation(text, find, replace);
                break;

            case 'random-suffix':
                text = addSuffixRandom(text, find, replace);
                break;

            case 'suffix':
                text = addSuffix(text, find, replace);
                break;

            default:
                text = replaceWord(text, find, replace);
                break;
        }
    }

    return text;
};

export default {
    get: (text: string) => addQuirks(text),
    try: (text: string) => (Gamble.rollDice() ? addQuirks(text) : text)
};
