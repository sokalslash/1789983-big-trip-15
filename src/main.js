import SiteMenuView from './view/menu.js';
import TripInfo from './view/info.js';
import EventsFiltersView from './view/filters';
import EventsSortView from './view/sort.js';
import ListEventsView from './view/list-events.js';
import TripEventView from './view/event';
import EventNewAddView from './view/add-point.js';
import PointEditView from './view/edit-point.js';
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


  const replacePointToFornEdit = () => {
    listEventsContainer.replaceChild(eventEdit.getElement(), eventTrip.getElement());
  };

  const replaceFornEditToPoint = () => {
    listEventsContainer.replaceChild(eventTrip.getElement(), eventEdit.getElement());
  };

  eventTrip.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToFornEdit();
  });

  eventEdit.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFornEditToPoint();
  });

  render(listEventsContainer, eventTrip.getElement(), RenderPosition.BEFOREEND);
};

const mocks = new Array(MOCK_COUNT).fill(null).map(generatePointTrip);
const mocksFilters = createMockFilters(mocks);

render(siteHeaderElement, new TripInfo(mocks).getElement(), RenderPosition.AFTERBEGIN);
render(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteFilterElement, new EventsFiltersView(mocksFilters).getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new EventsSortView().getElement(), RenderPosition.BEFOREEND);
const listEventsElement = new ListEventsView();
render(tripEventsElement, listEventsElement.getElement(), RenderPosition.BEFOREEND);
for (let i = 0; i < mocks.length; i++) {
  renderEvent(listEventsElement.getElement(), mocks[i]);
}
render(listEventsElement.getElement(), new EventNewAddView(mocks[0]).getElement(), RenderPosition.BEFOREEND);
