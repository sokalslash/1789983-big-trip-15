import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getArrayElements = (someArray) => new Array(getRandomInteger(0, someArray.length-1)).fill(null).map(() =>
  someArray[getRandomInteger(0, someArray.length-1)]);

export const humanizeDateForPoint = (someDate) => dayjs(someDate).format('MM/DD/YY HH:mm');

export const humanizeDateForEventAndInfo = (someDate) => dayjs(someDate).format('D MMM');

export const humanizeTimeForEvent = (someDate) => dayjs(someDate).format('H:mm');

export const humanizeDateForAttributeEvent = (someDate) => dayjs(someDate).format();

export const isPast = (date) => dayjs().isAfter(dayjs(date), 'D');

export const isFutures = (date) => dayjs().isBefore(dayjs(date), 'D');
