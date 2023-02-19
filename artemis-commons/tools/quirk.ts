import { Api, Gamble, Word } from '.';

type QuirkEntry = {
    find: string;
    replace: string;
    type?: 'letter' | 'punctuation' | 'suffix';
};

const separator = '|';

const addSpaces = (text: string) =>
    text.includes(separator)
        ? text
              .split(separator)
              .map(word => ` ${word} `)
              .join(separator)
        : text;

const addQuirks = async (text: string) => {
    const quirkList = await Api.get<QuirkEntry[][]>('quirks');
    const quirks = quirkList[Gamble.randomIndex(quirkList.length)];

    for (const { find, replace, type } of quirks) {
        switch (type) {
            case 'letter':
                text = Word.replaceAll(text, find, replace);
                break;
            case 'suffix':
                find.split(separator).forEach(word => {
                    [...Word.PUNCTUATION, ' '].forEach(point => {
                        text = Word.replaceAll(
                            text,
                            `${word}[${point}]`,
                            `${word}${replace}${point}`
                        );
                    });
                });
                break;
            case 'punctuation':
                find.split(separator).forEach(word => {
                    text = Word.replaceLast(text, `[${word}] `, `${word} ${replace}`);
                });
                break;
            default:
                text = Word.replaceAll(text, addSpaces(find), addSpaces(replace));
                break;
        }
    }

    return text;
};

export default {
    get: (text: string) => addQuirks(text),
    try: (text: string) => (Gamble.rollDice() ? addQuirks(text) : text)
};
