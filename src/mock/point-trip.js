import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/common.js';
import {getOffers} from './offers.js';
import {getDestination} from './destination';

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

const generateType = () => {

  const pointType = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant',
  ];

  const randomIndex = getRandomInteger(0, pointType.length-1);

  const type = pointType[randomIndex];

  return type;
};

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
  return {
    id: nanoid(),
    type: generateType(),
    offers: getOffers(),
    destination: getDestination(),
    dateFrom: newDateFrom,
    dateTo:newDateTo,
    dateDifference: generateDifferenceDate(newDateTo, newDateFrom),
    favorite: Boolean(getRandomInteger(0, 1)),
    basePrice: getRandomInteger(0, 1000),
    availableCities: cities,
  };
};

export {generatePointTrip};
