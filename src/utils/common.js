export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getArrayElements = (someArray) => new Array(getRandomInteger(0, someArray.length-1)).fill(null).map(() =>
  someArray[getRandomInteger(0, someArray.length-1)]);