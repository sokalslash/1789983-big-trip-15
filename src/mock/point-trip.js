import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger, getArrayElements} from '../utils/common.js';

const MAX_DATE_GAP = 151200;
const ONE_MINUTE = 60000;
const ONE_HOUR = 3600000;
const ONE_DAY = 86400000;

const cities = [
  'Salzburg',
  'Washington',
  'Cairo',
  'Galway',
  'Bonn',
  'La-Paz',
  'Kochi',
  'Vancouver',
  'Dubai',
  'Denver',
];

const generateType = () => {

  const typeObject = {
    'Taxi': 'img/icons/taxi.png',
    'Bus': 'img/icons/bus.png',
    'Train': 'img/icons/train.png',
    'Ship': 'img/icons/ship.png',
    'Drive': 'img/icons/drive.png',
    'Flight': 'img/icons/flight.png',
    'Check-in': 'img/icons/check-in.png',
    'Sightseeing': 'img/icons/sightseeing.png',
    'Restaurant': 'img/icons/restaurant.png',
  };

  const typeArray = Object.entries(typeObject);

  const randomIndex = getRandomInteger(0, typeArray.length-1);

  const type = typeArray[randomIndex];

  return {
    typePoint: type[0],
    iconPoint:  type[1],
  };
};

const offers = [
  {
    title: 'Upgrade to a business class',
    price: 120,
  },
  {
    title: 'Choose the radio station',
    price: 60,
  },
  {
    title: 'Add luggage',
    price: 50,
  },
  {
    title: 'Switch to comfort',
    price: 80,
  },
  {
    title: 'Add meal',
    price: 15,
  },
];

const generateDestination = () => {
  const descriptionsDestination = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  ];

  const randomIndexForDescripyionPictures = getRandomInteger(0, descriptionsDestination.length-1);

  const picturesDestination = [
    {
      src: `http://picsum.photos/248/152?r${Math.random()}`,
      description: descriptionsDestination[randomIndexForDescripyionPictures],
    },
    {
      src: `http://picsum.photos/248/152?r${Math.random()}`,
      description: descriptionsDestination[randomIndexForDescripyionPictures],
    },
    {
      src: `http://picsum.photos/248/152?r${Math.random()}`,
      description: descriptionsDestination[randomIndexForDescripyionPictures],
    },
  ];

  const randomIndexForCities = getRandomInteger(0, cities.length-1);

  return {
    description: getArrayElements(descriptionsDestination),
    name: cities[randomIndexForCities],
    pictures: getArrayElements(picturesDestination),
  };
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
  const typePoint = generateType();
  const newDateFrom = generateDateFrom();
  const newDateTo = generateDateTo(newDateFrom);
  return {
    id: nanoid(),
    type: typePoint,
    offers: getArrayElements(offers),
    destination: generateDestination(),
    dateFrom: newDateFrom,
    dateTo:newDateTo,
    dateDifference: generateDifferenceDate(newDateTo, newDateFrom),
    favorite: Boolean(getRandomInteger(0, 1)),
    basePrice: getRandomInteger(0, 1000),
    availableCities: cities,
  };
};

export {generatePointTrip};
