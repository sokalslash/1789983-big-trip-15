import {getRandomInteger, getArrayElements} from '../utils/common.js';

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

export const getDestination = () => [
  {
    nameCity: 'Salzburg',
    description: getArrayElements(descriptionsDestination),
    pictures: getArrayElements(picturesDestination),
  },
  {
    nameCity: 'Washington',
    description: getArrayElements(descriptionsDestination),
    pictures: getArrayElements(picturesDestination),
  },
  {
    nameCity: 'Vancouver',
    description: getArrayElements(descriptionsDestination),
    pictures: getArrayElements(picturesDestination),
  },
  {
    nameCity: 'Dubai',
    description: getArrayElements(descriptionsDestination),
    pictures: getArrayElements(picturesDestination),
  },
  {
    nameCity: 'Denver',
    description: getArrayElements(descriptionsDestination),
    pictures: getArrayElements(picturesDestination),
  },
];
