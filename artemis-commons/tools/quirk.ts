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

    text = `${text} `;

    for (const { find, replace, type } of quirks) {
        switch (type) {
            case 'letter':
                text = Word.replaceAllCase(text, find, replace);
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
                const spacedFind = addSpaces(find);

                text = Word.replaceAll(
                    text,
                    spacedFind,
                    spacedFind.includes(' ') ? ` ${replace} ` : replace
                );
                break;
        }
    }

    return text;
};

export default {
    get: (text: string) => addQuirks(text),
    try: (text: string) => (Gamble.rollDice() ? addQuirks(text) : text)
};
