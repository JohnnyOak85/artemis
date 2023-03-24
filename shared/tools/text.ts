export const PUNCTUATION = ['.', '?', ',', '!', ':', ';'];

export const append = (str: string, suffix: string) =>
    str.padEnd(str.length + suffix.length, suffix);

export const buildList = (list: string[]) => list.filter(x => x).join('\n');

export const replaceAll = (str: string, find: string, replace: string) =>
    str.replace(new RegExp(find, 'g'), replace);

export const replaceAllCase = (str: string, find: string, replace: string) =>
    str
        .replace(new RegExp(find.toLowerCase(), 'g'), replace.toLowerCase())
        .replace(new RegExp(find.toUpperCase(), 'g'), replace.toUpperCase());

export const replaceLast = (str: string, find: string, replace: string) =>
    str.replace(new RegExp(`${find}$`), replace);

export const startsWithAny = (str: string, words: string[]) =>
    words.some(word => str.startsWith(word));
