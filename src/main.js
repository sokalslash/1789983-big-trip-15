import {createSiteMenuTemplate} from './view/menu.js';
import {createTripInfoTemplate} from './view/info.js';
import {createEventsFiltersTemplate} from './view/filters';
import {createEventsSortTemplate} from './view/sort.js';
import {createTripEventsListTemplate} from './view/list-events.js';
import {createTripEventTemplate} from './view/event';
import {createEventNewAddTemplate} from './view/add-point.js';
import {createPointEditTemplate} from './view/edit-point.js';

const EVENT_COUNT = 3;

const siteHeaderElement = document.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createTripInfoTemplate(), 'afterbegin');
render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');
render(siteFilterElement, createEventsFiltersTemplate(), 'beforeend');
render(tripEventsElement, createEventsSortTemplate(), 'beforeend');
render(tripEventsElement, createTripEventsListTemplate(), 'beforeend');
const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');
for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripEventsListElement, createTripEventTemplate(), 'beforeend');
}
render(tripEventsListElement, createEventNewAddTemplate(), 'beforeend');
render(tripEventsListElement, createPointEditTemplate(), 'afterbegin');
