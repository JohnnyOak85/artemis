import {
    APIInteractionGuildMember,
    buildButtonRow,
    getData,
    getMemberRoles,
    Guild,
    GuildMember,
    logError,
    User
} from '../../../shared';
import { getPlayer } from '../player';
import { getAchievementsButton, getBestiaryButton, getStatsButton } from './buttons';
import { getAchievementsEmbed, getBestiaryEmbed, getStatsEmbed } from './embeds';

type PlayerData = {
    guild: Guild | null;
    member: APIInteractionGuildMember | GuildMember | null;
    user: User;
};

const getPlayerData = async ({ guild, member, user }: PlayerData) => {
    const roles = getMemberRoles(member);

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
    components: buildButtonRow([getStatsButton(), getBestiaryButton()]),
    ...getAchievementsEmbed(await getPlayerData(playerData))
});

const buildBestiaryMenu = async (playerData: PlayerData) => {
    const monsterList = await getData<string[]>('game/areas/list');

    return {
        components: buildButtonRow([getStatsButton(), getAchievementsButton()]),
        ...getBestiaryEmbed({
            ...(await getPlayerData(playerData)),
            monsterList
        })
    };
};

const buildStatsMenu = async (playerData: PlayerData) => ({
    components: buildButtonRow([getBestiaryButton(), getAchievementsButton()]),
    ...getStatsEmbed(await getPlayerData(playerData))
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
        logError(error, 'buildMenu');
        throw error;
    }
};
