import { getData, getEmbedObject } from '../../shared';
import { Article } from '../types';

export const getNews = async (type: string) => {
    try {
        const articles = await getData<Article[]>(`news/${type}`);

        return getEmbedObject(
            articles.map(article => ({
                description: article.excerpt,
                image: article.media,
                title: article.title,
                url: article.link
            }))
        );
    } catch (error) {
        throw error;
    }
};
