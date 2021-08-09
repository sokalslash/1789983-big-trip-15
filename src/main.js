import {createSiteMenuTemplate} from './view/menu.js';
import {createTripInfoTemplate} from './view/info.js';
import {createEventsFiltersTemplate} from './view/filters';
import {createEventsSortTemplate} from './view/sort.js';
import {createTripEventsListTemplate} from './view/list-events.js';
import {createTripEventTemplate} from './view/event';
import {createEventNewAddTemplate} from './view/add-point.js';
import {createPointEditTemplate} from './view/edit-point.js';
import {generatePointTrip} from './mock/point-trip';
import {createMockFilters} from './mock/filter-mock.js';

const MOCK_COUNT = 15;

const siteHeaderElement = document.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mocks = new Array(MOCK_COUNT).fill(null).map(generatePointTrip);
const mocksFilters = createMockFilters(mocks);

render(siteHeaderElement, createTripInfoTemplate(mocks), 'afterbegin');
render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');
render(siteFilterElement, createEventsFiltersTemplate(mocksFilters), 'beforeend');
render(tripEventsElement, createEventsSortTemplate(), 'beforeend');
render(tripEventsElement, createTripEventsListTemplate(mocks), 'beforeend');
const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');
for (let i = 1; i < mocks.length; i++) {
  render(tripEventsListElement, createTripEventTemplate(mocks[i]), 'beforeend');
}
render(tripEventsListElement, createEventNewAddTemplate(), 'beforeend');
render(tripEventsListElement, createPointEditTemplate(mocks[0]), 'afterbegin');
