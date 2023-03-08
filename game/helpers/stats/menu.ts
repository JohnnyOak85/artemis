import Discord, { DiscordCommandInteraction } from '../../../commons/discord';
import { Api, Log } from '../../../commons/tools';
import { getPlayer } from '../player';
import buttons from './buttons';
import embeds from './embeds';

const getPlayerData = async ({ guild, member, user }: DiscordCommandInteraction) => {
    const roles = Discord.getPlayerRoles(member);

    const player = await getPlayer({
        id: user.id,
        name: user.username,
        titles: roles.map(({ id }) => id)
    });

    const rank = await guild?.roles.fetch(player.rank);

    return {
        avatar: user.avatarURL(),
        ...player,
        rankName: rank?.name
    };
};

const buildAchievementsMenu = async (interaction: DiscordCommandInteraction) => ({
    components: Discord.buildButtonRow([buttons.stats(), buttons.bestiary()]),
    embeds: embeds.achievements(await getPlayerData(interaction))
});

const buildBestiaryMenu = async (interaction: DiscordCommandInteraction) => {
    const monsterList = await Api.get<string[]>('game/area/list');

    return {
        components: Discord.buildButtonRow([buttons.stats(), buttons.achievements()]),
        embeds: embeds.bestiary({
            ...(await getPlayerData(interaction)),
            monsterList
        })
    };
};

const buildStatsMenu = async (interaction: DiscordCommandInteraction) => ({
    components: Discord.buildButtonRow([buttons.bestiary(), buttons.achievements()]),
    embeds: embeds.stats(await getPlayerData(interaction))
});

export const buildMenu = (interaction: DiscordCommandInteraction, menu?: string) => {
    try {
        switch (menu) {
            case 'achievements':
                return buildAchievementsMenu(interaction);
            case 'bestiary':
                return buildBestiaryMenu(interaction);
            default:
                return buildStatsMenu(interaction);
        }
    } catch (error) {
        Log.error(error, 'buildMenu');
        throw error;
    }
};
