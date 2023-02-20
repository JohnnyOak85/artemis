const randomize = (max: number, min: number) => Math.floor(Math.random() * (max - min + 1) + min);

export default {
    random: (max = 100, min = 1) => randomize(max, min),
    randomIndex: (length: number) => randomize(length, 1) - 1,
    rollDice: () => randomize(6, 1) === 3,
    roshambo: () => randomize(3, 1) === 2,
    tossCoin: () => randomize(2, 0) === 0
};
