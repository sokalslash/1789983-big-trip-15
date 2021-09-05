import {isPast, isFutures} from '../utils/point-util.js';

const objectFiltersMocks = {
  everything: (mocks) => mocks.filter((mock) => mock),
  futures: (mocks) => mocks.filter((mock) => isFutures(mock.dateFrom)),
  past: (mocks) => mocks.filter((mock) => isPast(mock.dateTo)),
};

export const createMockFilters = (mocks) => Object.entries(objectFiltersMocks).map((element) => {
  const [filterName, countPoint] = element;
  return {
    name: filterName,
    count: countPoint(mocks),
  };
});
