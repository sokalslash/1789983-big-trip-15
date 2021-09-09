import SiteMenuView from './view/menu.js';
import {generatePointTrip} from './mock/point-trip';
import {getDestinations} from './mock/destination';
import {getOffers} from './mock/offers.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter-presenter.js';
import {RenderPosition, render} from './utils/render.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';

const MOCK_COUNT = 15;

const siteHeaderElement = document.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const mocksPoints = new Array(MOCK_COUNT).fill(null).map(generatePointTrip);
const mocksDestinations = getDestinations();
const mocksOffers = getOffers();

const pointsModel = new PointsModel();
pointsModel.setPoints(mocksPoints);

const filterModel = new FilterModel();

//render(siteHeaderElement, new TripInfoView(mocksPoints), RenderPosition.AFTERBEGIN);
render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement, siteHeaderElement, pointsModel, filterModel);
tripPresenter.init(mocksDestinations, mocksOffers);

const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
filterPresenter.init();
