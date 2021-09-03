import SiteMenuView from './view/menu.js';
import TripInfoView from './view/info.js';
import EventsFiltersView from './view/filters';
import {generatePointTrip} from './mock/point-trip';
import {getDestinations} from './mock/destination';
import {getOffers} from './mock/offers.js';
import {createMockFilters} from './mock/filter-mock.js';
import TripPresenter from './presenter/trip.js';
import {RenderPosition, render} from './utils/render.js';

const MOCK_COUNT = 15;

const siteHeaderElement = document.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const mocksPoint = new Array(MOCK_COUNT).fill(null).map(generatePointTrip);
const mocksDestinations = getDestinations();
const mocksOffers = getOffers();
const mocksFilters = createMockFilters(mocksPoint);

render(siteHeaderElement, new TripInfoView(mocksPoint), RenderPosition.AFTERBEGIN);
render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteFilterElement, new EventsFiltersView(mocksFilters), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement);
tripPresenter.init(mocksPoint, mocksDestinations, mocksOffers);
