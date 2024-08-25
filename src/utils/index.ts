export const roundIfDecimal = (value: number) => {
  return Number.isInteger(value) ? value : Math.round(value);
};

export const roundToNearestStep = (value: number, step: number) => {
  return Math.round(value / step) * step;
};