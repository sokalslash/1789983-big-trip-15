import dayjs from 'dayjs';

const ONE_MINUTE = 60000;
const ONE_HOUR = 3600000;
const ONE_DAY = 86400000;

export const SortType = {
  TIME: 'sort-time',
  PRICE: 'sort-price',
  DAY: 'sort-day',
};

export const pointTypeIcon = {
  'taxi': 'img/icons/taxi.png',
  'bus': 'img/icons/bus.png',
  'train': 'img/icons/train.png',
  'ship': 'img/icons/ship.png',
  'drive': 'img/icons/drive.png',
  'flight': 'img/icons/flight.png',
  'check-in': 'img/icons/check-in.png',
  'sightseeing': 'img/icons/sightseeing.png',
  'restaurant': 'img/icons/restaurant.png',
};

export const humanizeDateForPoint = (someDate) => dayjs(someDate).format('DD/MM/YYYY HH:mm');

export const humanizeDateForEventAndInfo = (someDate) => dayjs(someDate).format('D MMM');

export const humanizeTimeForEvent = (someDate) => dayjs(someDate).format('H:mm');

export const humanizeDateForAttributeEvent = (someDate) => dayjs(someDate).format();

export const generateDifferenceDate = (dateTo, dateFrom) => {
  const endDate = dayjs(dateTo);
  const startDate = dayjs(dateFrom);
  const differenceMilliseconds = endDate.diff(startDate);
  if (differenceMilliseconds < ONE_HOUR) {
    const differenceMinutes = endDate.diff(startDate, 'minute');
    return `${differenceMinutes}M`;
  }
  if (differenceMilliseconds < ONE_DAY) {
    const hour = Math.floor(differenceMilliseconds / ONE_HOUR);
    const minute = Math.floor((differenceMilliseconds - hour*60*60*1000) / ONE_MINUTE);
    return `${hour}H ${minute}M`;
  }
  if (differenceMilliseconds > ONE_DAY) {
    const day = Math.floor(differenceMilliseconds / ONE_DAY);
    const hour = Math.floor((differenceMilliseconds - day*24*60*60*1000) / ONE_HOUR);
    const minute = Math.floor((differenceMilliseconds - day*24*60*60*1000 - hour*60*60*1000) / ONE_MINUTE);
    return `${day}D ${hour}H ${minute}M`;
  }
};

export const isPast = (date) => dayjs().isAfter(dayjs(date), 'D');

export const isFutures = (date) => dayjs().isBefore(dayjs(date), 'D');

export const sortDay = (pointA, pointB) => {
  if (pointA.dateFrom > pointB.dateFrom) {
    return 1;
  }
  if (pointA.dateFrom < pointB.dateFrom) {
    return -1;
  }
  return 0;
};

export const sortTime = (pointA, pointB) => {
  const durationPointA = pointA.dateTo.diff(pointA.dateFrom);
  const durationPointB = pointB.dateTo.diff(pointB.dateFrom);
  return durationPointB - durationPointA;
};

export const sortPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
