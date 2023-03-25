import { getData, getEmbedObject, randomIndex } from '../../shared';

const getRandomQuote = async () => {
    const quotes = await getData<string[]>('speech/quotes');

    return quotes[randomIndex(quotes)];
};

export const getQuote = async () => {
    const quote = await getRandomQuote();

    if (!quote) return 'No quote';

    const [name, value] = quote.split('\n');

    return getEmbedObject([
        {
            title: 'Quote of the Week',
            fields: { name, value }
        }
    ]);
};
