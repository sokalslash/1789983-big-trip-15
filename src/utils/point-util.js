import dayjs from 'dayjs';
import {Time} from './common';

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

export const humanizeDateForPoint = (someDate) => dayjs(someDate).format('DD/MM/YY HH:mm');

export const humanizeDateForEventAndInfo = (someDate) => dayjs(someDate).format('D MMM');

export const humanizeTimeForEvent = (someDate) => dayjs(someDate).format('H:mm');

export const humanizeDateForAttributeEvent = (someDate) => dayjs(someDate).format();

export const generateDifferenceDate = (dateTo, dateFrom) => {
  const endDate = dayjs(dateTo);
  const startDate = dayjs(dateFrom);
  const differenceMilliseconds = endDate.diff(startDate);
  if (differenceMilliseconds < Time.ONE_HOUR) {
    const differenceMinutes = endDate.diff(startDate, 'minute');
    return `${differenceMinutes}M`;
  }
  if (differenceMilliseconds < Time.ONE_DAY) {
    const hour = Math.floor(differenceMilliseconds / Time.ONE_HOUR);
    const minute = Math.floor((differenceMilliseconds - hour * Time.ONE_HOUR) / Time.ONE_MINUTE);
    return `${hour}H ${minute}M`;
  }
  if (differenceMilliseconds > Time.ONE_DAY) {
    const day = Math.floor(differenceMilliseconds / Time.ONE_DAY);
    const hour = Math.floor((differenceMilliseconds - day * Time.ONE_DAY) / Time.ONE_HOUR);
    const minute = Math.floor((differenceMilliseconds - day * Time.ONE_DAY - hour * Time.ONE_HOUR) / Time.ONE_MINUTE);
    return `${day}D ${hour}H ${minute}M`;
  }
};

export const sortDay = (pointA, pointB) => {
  if (dayjs(pointA.dateFrom).isAfter(dayjs(pointB.dateFrom))) {
    return 1;
  }
  if (dayjs(pointA.dateFrom).isBefore(dayjs(pointB.dateFrom))) {
    return -1;
  }
  return 0;
};

export const sortTime = (pointA, pointB) => {
  const durationPointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationPointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return durationPointB - durationPointA;
};

export const sortPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
