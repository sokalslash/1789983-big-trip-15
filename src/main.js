import SiteMenuView from './view/menu.js';
import {generatePointTrip} from './mock/point-trip';
import {getDestinations} from './mock/destination';
import {getOffers} from './mock/offers.js';
import {cities} from './mock/available-cities';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter-presenter.js';
import {RenderPosition, render} from './utils/render.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import {MenuItem} from './utils/common.js';

const MOCK_COUNT = 15;

const siteHeaderElement = document.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const mocksPoints = new Array(MOCK_COUNT).fill(null).map(generatePointTrip);

const siteMenuComponent = new SiteMenuView();

const mocksDestinations = getDestinations();
const mocksOffers = getOffers();
const mocksCities = cities;

const pointsModel = new PointsModel();
pointsModel.setPoints(mocksPoints);

const filterModel = new FilterModel();

render(siteMenuElement, siteMenuComponent, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement, siteHeaderElement, pointsModel, filterModel);
tripPresenter.init(mocksDestinations, mocksOffers, mocksCities);

const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:

      break;
    case MenuItem.POINTS:

      break;
    case MenuItem.STATISTICS:

      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
