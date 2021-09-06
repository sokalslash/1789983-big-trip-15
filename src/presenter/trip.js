import ListEventsView from '../view/list-events.js';
import NoEventsTripView from '../view/no-events.js';
import EventsSortView from '../view/sort.js';
import PointPresenter from './point-presenter.js';
import {RenderPosition, render, remove} from '../utils/render.js';
import {SortType, sortTime, sortPrice, sortDay} from '../utils/point-util.js';
import {UserAction, UpdateType} from '../utils/common.js';

const NO_EVENTS = 0;

export default class Trip {
  constructor(tripEventsElement, pointsModel) {
    this._pointsModel = pointsModel;
    this._tripEventsElement = tripEventsElement;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._listEventsElement = new ListEventsView();
    this._noEventsTrip = new NoEventsTripView();
    this._eventsSort = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init(destinations, offers) {
    this._destinations = destinations;
    this._offers = offers;

    this._renderTrip();
  }

  _getPointsModel() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortTime);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPrice);
      case SortType.DAY:
        return this._pointsModel.getPoints().slice().sort(sortDay);
    }
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
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
        this._pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _renderNoEvents() {
    render(this._tripEventsElement, this._noEventsTrip, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._eventsSort !== null) {
      this._eventsSort = null;
    }

    this._eventsSort = new EventsSortView();
    render(this._tripEventsElement, this._eventsSort, RenderPosition.BEFOREEND);
    this._eventsSort.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(tripEvent, destinations, offers) {
    const pointPresenter = new PointPresenter(this._listEventsElement, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(tripEvent, destinations, offers);
    this._pointPresenter.set(tripEvent.id, pointPresenter);
  }

  _clearTripEventsList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderTripEvents(tripEvents, destinations, offers) {
    render(this._tripEventsElement, this._listEventsElement, RenderPosition.BEFOREEND);
    for (let i = 0; i < tripEvents.length; i++) {
      this._renderEvent(tripEvents[i], destinations, offers);
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

  _clearTrip({resetSortType = false} = {}) {
    this._clearTripEventsList();

    remove(this._listEventsElement);
    remove(this._eventsSort);
    remove(this._noEventsTrip);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderTrip() {
    const points = this._getPointsModel();
    if(this._pointsModel.getPoints().length === NO_EVENTS) {
      this._renderNoEvents();
    } else {
      this._renderSort();
      this._renderTripEvents(points, this._destinations, this._offers);
    }
  }
}
