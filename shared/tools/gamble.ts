const randomize = (max: number, min: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const random = (max = 100, min = 1) => randomize(max, min);
export const randomIndex = (list: any[]) => randomize(list.length, 1) - 1;
export const rollDice = () => randomize(6, 1) === 3;
export const roshambo = () => randomize(3, 1) === 2;
export const tossCoin = () => randomize(1, 0) === 1;
