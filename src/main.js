import SiteMenuView from './view/menu.js';
import TripInfo from './view/info.js';
import EventsFiltersView from './view/filters';
import EventsSortView from './view/sort.js';
import ListEventsView from './view/list-events.js';
import TripEventView from './view/event';
import PointEditView from './view/edit-point.js';
import NoEventsTripView from './view/no-events.js';
import {generatePointTrip} from './mock/point-trip';
import {createMockFilters} from './mock/filter-mock.js';
import {RenderPosition, render} from './utils.js';

const MOCK_COUNT = 15;

const siteHeaderElement = document.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const renderEvent = (listEventsContainer, eventOfTrip) => {
  const eventTrip = new TripEventView(eventOfTrip);
  const eventEdit = new PointEditView(eventOfTrip);

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      eventEdit.onFormEditClickOrKeyDown(listEventsContainer, eventTrip.getElement());
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventTrip.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    eventTrip.onButtonRollupClick(listEventsContainer, eventEdit.getElement());
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEdit.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    eventEdit.onFormEditClickOrKeyDown(listEventsContainer, eventTrip.getElement());
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEdit.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    eventEdit.onFormEditClickOrKeyDown(listEventsContainer, eventTrip.getElement());
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(listEventsContainer, eventTrip.getElement(), RenderPosition.BEFOREEND);
};

const mocks = new Array(MOCK_COUNT).fill(null).map(generatePointTrip);
const mocksFilters = createMockFilters(mocks);

render(siteHeaderElement, new TripInfo(mocks).getElement(), RenderPosition.AFTERBEGIN);
render(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteFilterElement, new EventsFiltersView(mocksFilters).getElement(), RenderPosition.BEFOREEND);
if(mocks.length === 0) {
  render(tripEventsElement, new NoEventsTripView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new EventsSortView().getElement(), RenderPosition.BEFOREEND);
}
const listEventsElement = new ListEventsView();
render(tripEventsElement, listEventsElement.getElement(), RenderPosition.BEFOREEND);
for (let i = 0; i < mocks.length; i++) {
  renderEvent(listEventsElement.getElement(), mocks[i]);
}
