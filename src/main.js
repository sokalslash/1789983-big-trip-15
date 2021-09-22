import SiteMenuView from './view/menu.js';
import StatisticsView from './view/stats.js';
import ErrorView from './view/error-message.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import DestinationsModel from './model/destinations.js';
import OffersModel from './model/offers.js';
import {MenuItem, UpdateType} from './utils/common.js';
import {FilterType} from './utils/filter-util.js';
import {RenderPosition, render, remove} from './utils/render.js';
import Api from './api.js';


const AUTHORIZATION = 'Basic M23nh1p8HG95lK';
const ADDRESS = 'https://15.ecmascript.pages.academy/big-trip';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const eventAddButtonElement = document.querySelector('.trip-main__event-add-btn');
const pageBodyElement = document.querySelector('.page-body__page-main div[class="page-body__container"]');

eventAddButtonElement.disabled = true;

const api = new Api(ADDRESS, AUTHORIZATION);

const siteMenuComponent = new SiteMenuView();

render(siteMenuElement, siteMenuComponent, RenderPosition.BEFOREEND);

const destinationsModel = new DestinationsModel();

const offersModel = new OffersModel();

const pointsModel = new PointsModel();

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripEventsElement, siteHeaderElement, pointsModel, filterModel, api);
tripPresenter.init(destinationsModel, offersModel);

const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
filterPresenter.init();

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    eventAddButtonElement.disabled = false;
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    eventAddButtonElement.disabled = false;
  });

const handlePointNewFormClose = () => {
  siteMenuComponent.setMenuItem(MenuItem.POINTS);
};

let messageErrorComponent = null;

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      if (statisticsComponent !== null) {
        remove(statisticsComponent);
      }
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init(destinationsModel, offersModel);
      tripPresenter.createPoint(handlePointNewFormClose);
      siteMenuComponent.removeMenuItem();
      eventAddButtonElement.disabled = true;
      break;
    case MenuItem.POINTS:
      if (statisticsComponent !== null) {
        remove(statisticsComponent);
      }
      siteMenuComponent.setMenuItem(MenuItem.POINTS);
      tripPresenter.destroy();
      tripPresenter.init(destinationsModel, offersModel);
      break;
    case MenuItem.STATISTICS:
      siteMenuComponent.setMenuItem(MenuItem.STATISTICS);
      if (messageErrorComponent === null) {
        tripPresenter.destroy();
        statisticsComponent = new StatisticsView(pointsModel.getPoints());
        render(pageBodyElement, statisticsComponent, RenderPosition.BEFOREEND);
      }
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

eventAddButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.ADD_NEW_POINT);
});

api.getDestinations()
  .then((detinations) => destinationsModel.setDestinations(detinations))
  .catch((error) => {
    tripPresenter.destroy();
    if (statisticsComponent !== null) {
      remove(statisticsComponent);
    }
    messageErrorComponent = new ErrorView(error);
    render(tripEventsElement, messageErrorComponent, RenderPosition.BEFOREEND);
  });

api.getOffers()
  .then((offers) => offersModel.setOffers(offers))
  .catch(() => offersModel.setOffers([]));

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});
