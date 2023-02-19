export default {
    PUNCTUATION: ['.', '?', ',', '!', ':', ';'],
    append: (str: string, suffix: string) => str.padEnd(str.length + suffix.length, suffix),
    replaceAll: (str: string, find: string, replace: string) =>
        str.replace(new RegExp(find, 'g'), replace),
    replaceAllCase: (str: string, find: string, replace: string) =>
        str
            .replace(new RegExp(find.toLowerCase(), 'g'), replace.toLowerCase())
            .replace(new RegExp(find.toUpperCase(), 'g'), replace.toUpperCase()),
    replaceLast: (str: string, find: string, replace: string) =>
        str.replace(new RegExp(`${find}$`), replace),
    startsWithAny: (str: string, words: string[]) => words.some(word => str.startsWith(word))
};
