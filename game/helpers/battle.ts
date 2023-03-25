import { logError, TextChannel, tossCoin } from '../../shared';
import battleCalculator from './battle.calculator';
import { getBuffs } from './buffs';
import { Fighter, Monster, PlayerData } from './interfaces';
import { getPlayer, savePlayer } from './player';
import { FighterStore, GameStore, MessageStore, MonsterStore } from './stores';

const checkAttack = (attacker: Fighter, defender: Fighter, summary: string[]) => {
    if (!attacker.boost) {
        summary.push(`**${attacker.name}** missed...`);
    } else if (!defender.damage) {
        summary.push(`**${defender.name}** defended!`);
    } else {
        defender.health = battleCalculator.calcHealth(defender.health, defender.damage);

        summary.push(
            `**${attacker.name}** attacks! *${defender.damage}* :boom: **${defender.name}** \`${defender.health}/${defender.originalHealth}\` HP`
        );
    }
};

const checkDefense = async (attacker: Fighter, defender: Fighter, summary: string[]) => {
    const willCounter = (await battleCalculator.calcLuck(defender.luck)) && tossCoin();
    const willFollow = attacker.boost && (await battleCalculator.calcLuck(attacker.luck));

    if (willCounter) {
        attacker.health = battleCalculator.calcHealth(attacker.health, defender.attack);

        summary.push(
            `**${defender.name}** counters! *${defender.attack}* :boom: **${attacker.name}** \`${attacker.health}/${attacker.originalHealth}\` HP`
        );
    } else if (willFollow) {
        summary.push(`**${attacker.name}** follows through!`);

        return { winner: attacker, loser: defender, summary: summary.join('\n') };
    }

    return { winner: defender, loser: attacker, summary: summary.join('\n') };
};

const playRound = async (attacker: Fighter, defender: Fighter) => {
    const summary: string[] = [];

    attacker.boost = await battleCalculator.calcBoost(attacker.attack);
    defender.boost = await battleCalculator.calcBoost(defender.defense);
    defender.damage = await battleCalculator.calcDamage(attacker.boost, defender.boost);

    checkAttack(attacker, defender, summary);

    if (defender.health <= 0) {
        return { winner: attacker, loser: defender, summary: summary.join('\n') };
    }

    return checkDefense(attacker, defender, summary);
};

const endBattle = async (monster: Monster, channel: TextChannel) => {
    const loser = FighterStore.getLoser();
    const winner = FighterStore.getWinner();

    if (winner) {
        winner.wins++;
        await getBuffs(winner, monster, channel);
        savePlayer(winner);
    } else if (loser) {
        loser.losses++;
        savePlayer(loser);
    }
};

export const startRounds = async (playerId: string, monsterId: string, channel: TextChannel) => {
    let attacker = FighterStore.getFighter(playerId);
    let defender = FighterStore.getFighter(monsterId);
    let finished = false;

    while (!finished) {
        const { loser, winner, summary } = await playRound(attacker, defender);

        attacker = winner;
        defender = loser;

        FighterStore.storeLoser(loser);
        FighterStore.storeWinner(winner);

        channel.send(summary);

        finished = loser.health <= 0;
    }

    MonsterStore.deleteMonster();
    GameStore.restart();
};

export const engageBattle = async (playerData: PlayerData, channel: TextChannel) => {
    try {
        const monster = MonsterStore.getMonster();
        const player = await getPlayer(playerData);

        if (!monster) return;

        GameStore.stop();
        MessageStore.deleteMessage();

        FighterStore.storeFighter({
            ...monster,
            ...{ name: monster.description, originalHealth: monster.health, type: 'monster' }
        });
        FighterStore.storeFighter({
            ...player,
            ...{ originalHealth: player.health, type: 'player' }
        });

        await startRounds(player.id, monster.id, channel);

        await endBattle(monster, channel);

        GameStore.restart();
    } catch (error) {
        logError(error, 'engageBattle');
        throw error;
    }
};
