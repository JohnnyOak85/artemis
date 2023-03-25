import { getData, random } from '../../../shared';

type AttributeStats = {
    max: number;
    maxGain: number;
};

type BaseStats = {
    attack: number;
    defense: number;
    health: number;
};

type BattleStats = {
    damageControl: number;
    doubleChance: number;
    missChance: number;
};

type HealthStats = {
    base: number;
    cap: number;
    maxControl: number;
    maxDivisor: number;
    minControl: number;
    minDivisor: number;
};

type LevelStats = {
    minDecrement: number;
    max: number;
    maxMultiplier: number;
    multiplier: number;
};

type LuckStats = {
    cap: number;
    chance: number;
    max: number;
    multiplier: number;
};

type MainStats = {
    base: 50;
    cap: 2000;
    control: 15;
    divider: 1.5;
    maxMultiplier: 2;
    minIncrement: 5;
};

type StatCaps = {
    healthCap: number;
    luckCap: number;
    statCap: number;
};

const divide = (dividend: number, divisor = 2) => dividend / divisor;
const roundDown = (number: number) => Math.floor(Math.max(0, number));

const calcMaxLevel = (rank: number, multiplier: number) => rank * multiplier;
const calcMinLevel = (maxLevel: number, decrement: number) => maxLevel - decrement;

const calcStatMin = (level: number, control: number, increment: number) =>
    (control + increment) * level;
const calcStatMax = (statMin: number, multiplier: number) => statMin * multiplier;

const getHealthControl = (level: number, divisor: number, base: number) => base * (level / divisor);

const getStats = <T>(stat: string) => getData<T>(`game/stats/${stat}`);

export const calcHealth = async (level: number) => {
    const { minDivisor, maxDivisor, base } = await getStats<HealthStats>('health');
    const minHealth = getHealthControl(level, minDivisor, base);
    const maxHealth = getHealthControl(level, maxDivisor, base);
    const healthMedian = random(maxHealth, minHealth);

    return roundDown(base + healthMedian);
};

export const calcLevel = async (rank: number) => {
    const { maxMultiplier, minDecrement } = await getStats<LevelStats>('level');
    const maxLevel = calcMaxLevel(rank, maxMultiplier);
    const minLevel = calcMinLevel(maxLevel, minDecrement);

    return random(maxLevel, minLevel);
};

export const calcLuck = async (level: number) => {
    const { multiplier } = await getStats<LuckStats>('luck');
    const maxLuck = level * multiplier;

    return random(maxLuck);
};

export const calcStats = async (level: number) => {
    const { maxMultiplier, minIncrement, control, divider } = await getStats<MainStats>('main');
    const statMin = calcStatMin(level, control, minIncrement);
    const statMax = calcStatMax(statMin, maxMultiplier);
    const statMedian = random(statMax, statMin);
    const median = divide(statMedian, divider);

    return {
        attack: roundDown(statMax - median),
        defense: roundDown(statMin + median)
    };
};

export const getAttributeStats = () => getStats<AttributeStats>('attributes');
export const getBattleStats = () => getStats<BattleStats>('battle');
export const getHealthStats = () => getStats<HealthStats>('health');
export const getLevelStats = () => getStats<LevelStats>('level');
export const getLuckStats = () => getStats<LuckStats>('luck');
export const getStatCaps = () => getStats<StatCaps>('caps');
export const getPlayerBaseStats = () => getStats<BaseStats>('base');
