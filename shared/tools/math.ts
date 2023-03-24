export const divide = (dividend: number, divisor: number, min = 1) =>
    Math.max(min, Math.floor(dividend / divisor));
export const multiply = (multiplicand: number, multiplier = 2) => multiplicand * multiplier;
export const roundDown = (number: number) => Math.floor(Math.max(0, number));
