import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/common.js';
import {getOffers} from './offers.js';
import {getDestinations} from './destination';

const MAX_DATE_GAP = 151200;
const ONE_MINUTE = 60000;
const ONE_HOUR = 3600000;
const ONE_DAY = 86400000;

const cities = [
  'Salzburg',
  'Washington',
  'Vancouver',
  'Dubai',
  'Denver',
];

const generateDateFrom = () => {
  const secondGapForFrom = getRandomInteger(-MAX_DATE_GAP, MAX_DATE_GAP);
  return dayjs().add(secondGapForFrom, 'second');
};

const generateDateTo = (date) => {
  const secondGapForTo = getRandomInteger(1, MAX_DATE_GAP);
  return date.add(secondGapForTo, 'second');
};

const generateDifferenceDate = (endDate, startDate) => {
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

const generatePointTrip = () => {
  const newDateFrom = generateDateFrom();
  const newDateTo = generateDateTo(newDateFrom);
  const destinations = getDestinations();
  const someOffers = getOffers();
  return {
    id: nanoid(),
    offers: someOffers[getRandomInteger(0, someOffers.length-1)],
    destination: destinations[getRandomInteger(0, destinations.length-1)],
    dateFrom: newDateFrom,
    dateTo:newDateTo,
    dateDifference: generateDifferenceDate(newDateTo, newDateFrom),
    favorite: Boolean(getRandomInteger(0, 1)),
    basePrice: getRandomInteger(0, 1000),
    availableCities: cities,
  };
};

export {generatePointTrip};
