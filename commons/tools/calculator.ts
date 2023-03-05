export default {
    divide: (dividend: number, divisor: number, min = 1) =>
        Math.max(min, Math.floor(dividend / divisor)),
    multiply: (multiplicand: number, multiplier = 2) => multiplicand * multiplier,
    roundDown: (number: number) => Math.floor(Math.max(0, number))
};
