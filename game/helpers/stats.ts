import { Api, Gamble } from '../../commons/tools';

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

type BaseStats = {
    attack: number;
    defense: number;
    health: number;
};

const divide = (dividend: number, divisor = 2) => dividend / divisor;
const roundDown = (number: number) => Math.floor(Math.max(0, number));

const calcMaxLevel = (rank: number, multiplier: number) => rank * multiplier;
const calcMinLevel = (maxLevel: number, decrement: number) => maxLevel - decrement;

const calcStatMin = (level: number, control: number, increment: number) =>
    (control + increment) * level;
const calcStatMax = (statMin: number, multiplier: number) => statMin * multiplier;

const getHealthControl = (level: number, divisor: number, base: number) => base * (level / divisor);

const getStats = <T>(stat: string) => Api.get<T>(`game/stats/${stat}`);

export default {
    calcHealth: async (level: number) => {
        const { minDivisor, maxDivisor, base } = await getStats<HealthStats>('health');
        const minHealth = getHealthControl(level, minDivisor, base);
        const maxHealth = getHealthControl(level, maxDivisor, base);
        const healthMedian = Gamble.random(maxHealth, minHealth);

        return roundDown(base + healthMedian);
    },
    calcLevel: async (rank: number) => {
        const { maxMultiplier, minDecrement } = await getStats<LevelStats>('level');
        const maxLevel = calcMaxLevel(rank, maxMultiplier);
        const minLevel = calcMinLevel(maxLevel, minDecrement);

        return Gamble.random(maxLevel, minLevel);
    },
    calcLuck: async (level: number) => {
        const { multiplier } = await getStats<LuckStats>('luck');
        const maxLuck = level * multiplier;

        return Gamble.random(maxLuck);
    },
    calcStats: async (level: number) => {
        const { maxMultiplier, minIncrement, control, divider } = await getStats<MainStats>('main');
        const statMin = calcStatMin(level, control, minIncrement);
        const statMax = calcStatMax(statMin, maxMultiplier);
        const statMedian = Gamble.random(statMax, statMin);
        const median = divide(statMedian, divider);

        return {
            attack: roundDown(statMax - median),
            defense: roundDown(statMin + median)
        };
    },
    getPlayerBaseStats: async () => getStats<BaseStats>('base')
};
