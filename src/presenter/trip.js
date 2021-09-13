import ListEventsView from '../view/list-events.js';
import NoTripEventsView from '../view/no-events.js';
import EventsSortView from '../view/sort.js';
import TripInfoView from '../view/info.js';
import PointPresenter from './point-presenter.js';
import PointNewPresenter from './point-new.js';
import {RenderPosition, render, remove} from '../utils/render.js';
import {SortType, sortTime, sortPrice, sortDay} from '../utils/point-util.js';
import {UserAction, UpdateType} from '../utils/common.js';
import {filter, FilterType} from '../utils/filter-util.js';

const NO_EVENTS = 0;

export default class Trip {
  constructor(tripEventsElement, siteHeaderElement, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._tripEventsElement = tripEventsElement;
    this._siteHeaderElement = siteHeaderElement;
    this._pointPresenter = new Map();
    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.DAY;

    this._eventsSortComponent = null;
    this._noTripEventsComponent = null;

    this._listEventsComponent = new ListEventsView();
    this._tripInfoComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._listEventsComponent, this._handleViewAction);
  }

  init(destinations, offers, cities) {
    this._destinations = destinations;
    this._offers = offers;
    this._cities = cities;

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._pointNewPresenter.init(this._destinations, this._offers, this._cities, callback);
  }

  _getPointsModel() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[this._filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
      case SortType.DAY:
        return filteredPoints.sort(sortDay);
    }
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
    this._pointNewPresenter.destroy();
  }

  _handleViewAction(actionType, updateType, update) {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePointsModel(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter.get(data.id).init(data, this._destinations, this._offers, this._cities);
        break;
      case UpdateType.MINOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true, resetTripInfo: true});
        this._renderTrip();
        break;
    }
  }

  _renderNoEvents() {
    this._noTripEventsComponent = new NoTripEventsView(this._filterType);
    render(this._tripEventsElement, this._noTripEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._eventsSortComponent !== null) {
      this._eventsSortComponent = null;
    }

    this._eventsSortComponent = new EventsSortView(this._currentSortType);
    render(this._tripEventsElement, this._eventsSortComponent, RenderPosition.BEFOREEND);
    this._eventsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripInfo(tripEvents) {
    if (this._tripInfoComponent !== null) {
      return;
    }

    this._tripInfoComponent = new TripInfoView(tripEvents);
    render(this._siteHeaderElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(tripEvent, destinations, offers, cities) {
    const pointPresenter = new PointPresenter(this._listEventsComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(tripEvent, destinations, offers, cities);
    this._pointPresenter.set(tripEvent.id, pointPresenter);
  }

  _clearTripEventsList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderTripEvents(tripEvents, destinations, offers, cities) {
    render(this._tripEventsElement, this._listEventsComponent, RenderPosition.BEFOREEND);
    for (let i = 0; i < tripEvents.length; i++) {
      this._renderEvent(tripEvents[i], destinations, offers, cities);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _clearTrip({resetSortType = false, resetTripInfo = false} = {}) {
    this._clearTripEventsList();
    this._pointNewPresenter.destroy();

    remove(this._listEventsComponent);
    remove(this._eventsSortComponent);

    if (this._noTripEventsComponent) {
      remove(this._noTripEventsComponent);
    }

    if (resetTripInfo) {
      remove(this._tripInfoComponent);
      this._tripInfoComponent = null;
    }

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderTrip() {
    const points = this._getPointsModel();
    if(points.length === NO_EVENTS) {
      this._renderNoEvents();
    } else {
      this._renderTripInfo(points);
      this._renderSort();
      this._renderTripEvents(points, this._destinations, this._offers, this._cities);
    }
  }
}
