import { DiscordChannel } from '../../commons/discord';
import { Gamble, Log } from '../../commons/tools';
import battleCalculator from './battle.calculator';
import { getPlayer, PlayerData, savePlayer } from './player';
import fighterStore, { Fighter } from './stores/fighter.store';
import gameStore from './stores/game.store';
import messageStore from './stores/message.store';
import monsterStore, { Monster } from './stores/monster.store';
import getBuffs from './buffs';

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
    const willCounter = (await battleCalculator.calcLuck(defender.luck)) && Gamble.tossCoin();
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

const endBattle = async (monster: Monster, channel: DiscordChannel) => {
    const loser = fighterStore.getLoser();
    const winner = fighterStore.getWinner();

    if (winner) {
        winner.wins++;
        await getBuffs(winner, monster, channel);
        savePlayer(winner);
    } else if (loser) {
        loser.losses++;
        savePlayer(loser);
    }
};

export const startRounds = async (playerId: string, monsterId: string, channel: DiscordChannel) => {
    let attacker = fighterStore.getFighter(playerId);
    let defender = fighterStore.getFighter(monsterId);
    let finished = false;

    while (!finished) {
        const { loser, winner, summary } = await playRound(attacker, defender);

        attacker = winner;
        defender = loser;

        fighterStore.storeLoser(loser);
        fighterStore.storeWinner(winner);

        channel.send(summary);

        finished = loser.health <= 0;
    }

    monsterStore.deleteMonster();
    gameStore.restart();
};

export const engageBattle = async (playerData: PlayerData, channel: DiscordChannel) => {
    try {
        const monster = monsterStore.getMonster();
        const player = await getPlayer(playerData);

        if (!monster) return;

        gameStore.stop();
        messageStore.deleteMessage();

        fighterStore.storeFighter({
            ...monster,
            ...{ name: monster.description, originalHealth: monster.health, type: 'monster' }
        });
        fighterStore.storeFighter({
            ...player,
            ...{ originalHealth: player.health, type: 'player' }
        });

        await startRounds(player.id, monster.id, channel);

        await endBattle(monster, channel);

        gameStore.restart();
    } catch (error) {
        Log.error(error, 'engageBattle');
        throw error;
    }
};
