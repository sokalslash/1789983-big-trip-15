import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/common.js';
import {getOffers} from './offers.js';
import {getDestinations} from './destination';

const MAX_DATE_GAP = 151200;

const typePoint = [
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

const generateDateFrom = () => {
  const secondGapForFrom = getRandomInteger(-MAX_DATE_GAP, MAX_DATE_GAP);
  return dayjs().add(secondGapForFrom, 'second');
};

const generateDateTo = (date) => {
  const secondGapForTo = getRandomInteger(1, MAX_DATE_GAP);
  return date.add(secondGapForTo, 'second');
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
    dateFrom: newDateFrom.toISOString(),
    dateTo:newDateTo.toISOString(),
    favorite: Boolean(getRandomInteger(0, 1)),
    basePrice: getRandomInteger(0, 1000),
    type: typePoint[getRandomInteger(0, typePoint.length-1)],
  };
};

export {generatePointTrip};
