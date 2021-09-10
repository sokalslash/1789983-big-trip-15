import SiteMenuView from './view/menu.js';
import StatisticsView from './view/stats.js';
import {generatePointTrip} from './mock/point-trip';
import {getDestinations} from './mock/destination';
import {getOffers} from './mock/offers.js';
import {cities} from './mock/available-cities';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import {MenuItem, UpdateType} from './utils/common.js';
import {FilterType} from './utils/filter-util.js';
import {RenderPosition, render, remove} from './utils/render.js';

const MOCK_COUNT = 15;

const siteHeaderElement = document.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const eventAddButtonElement = document.querySelector('.trip-main__event-add-btn');
const pageBodyElement = document.querySelector('.page-body__page-main div[class="page-body__container"]');
console.log(pageBodyElement);

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

const handlePointNewFormClose = () => {
  siteMenuComponent.setMenuItem(MenuItem.POINTS);
};

const statisticsComponent = new StatisticsView(pointsModel.getPoints());

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      remove(statisticsComponent);
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
      tripPresenter.init(mocksDestinations, mocksOffers, mocksCities);
      tripPresenter.createPoint(handlePointNewFormClose);
      siteMenuComponent.removeMenuItem();
      eventAddButtonElement.disabled = true;
      break;
    case MenuItem.POINTS:
      remove(statisticsComponent);
      siteMenuComponent.setMenuItem(MenuItem.POINTS);
      tripPresenter.destroy();
      tripPresenter.init(mocksDestinations, mocksOffers, mocksCities);
      break;
    case MenuItem.STATISTICS:
      siteMenuComponent.setMenuItem(MenuItem.STATISTICS);
      tripPresenter.destroy();
      render(pageBodyElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

eventAddButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.ADD_NEW_POINT);
});
