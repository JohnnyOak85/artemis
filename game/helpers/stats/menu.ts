import Discord, { DiscordGuild, DiscordMember, DiscordUser } from '../../../commons/discord';
import { Api, Log } from '../../../commons/tools';
import { getPlayer } from '../player';
import buttons from './buttons';
import embeds from './embeds';

type PlayerData = {
    guild: DiscordGuild | null;
    member: DiscordMember | null;
    user: DiscordUser;
};

const getPlayerData = async ({ guild, member, user }: PlayerData) => {
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

const buildAchievementsMenu = async (playerData: PlayerData) => ({
    components: Discord.buildButtonRow([buttons.stats(), buttons.bestiary()]),
    embeds: embeds.achievements(await getPlayerData(playerData))
});

const buildBestiaryMenu = async (playerData: PlayerData) => {
    const monsterList = await Api.get<string[]>('game/area/list');

    return {
        components: Discord.buildButtonRow([buttons.stats(), buttons.achievements()]),
        embeds: embeds.bestiary({
            ...(await getPlayerData(playerData)),
            monsterList
        })
    };
};

const buildStatsMenu = async (playerData: PlayerData) => ({
    components: Discord.buildButtonRow([buttons.bestiary(), buttons.achievements()]),
    embeds: embeds.stats(await getPlayerData(playerData))
});

export const buildMenu = (playerData: PlayerData, menu?: string) => {
    try {
        switch (menu) {
            case 'achievements':
                return buildAchievementsMenu(playerData);
            case 'bestiary':
                return buildBestiaryMenu(playerData);
            default:
                return buildStatsMenu(playerData);
        }
    } catch (error) {
        Log.error(error, 'buildMenu');
        throw error;
    }
};
