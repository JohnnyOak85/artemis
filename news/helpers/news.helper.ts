import { buildEmbed } from '../../commons/discord';
import { Api } from '../../commons/tools';
import { Article } from '../types';

export const getNews = async (type: string) => {
    try {
        const articles = await Api.get<Article[]>(`news/${type}`);

        return articles.map(article =>
            buildEmbed({
                description: article.excerpt,
                image: article.media,
                title: article.title,
                url: article.link
            })
        );
    } catch (error) {
        throw error;
    }
};
