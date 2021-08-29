import ListEventsView from '../view/list-events.js';
import NoEventsTripView from '../view/no-events.js';
import EventsSortView from '../view/sort.js';
import PointPresenter from './point-presenter.js';
import {RenderPosition, render} from '../utils/render.js';
import {updateItem} from '../utils/common';
import {SortType, sortTime, sortPrice} from '../utils/point-util.js';

const NO_EVENTS = 0;

export default class Trip {
  constructor(tripEventsElement) {
    this._tripEventsElement = tripEventsElement;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._listEventsElement = new ListEventsView();
    this._noEventsTrip = new NoEventsTripView();
    this._eventsSort = new EventsSortView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._sourceTripEvents = tripEvents.slice();

    if(this._tripEvents.length === NO_EVENTS) {
      this._renderNoEvents();
    } else {
      this._renderSort();
      this._renderTripEvents(this._tripEvents);
    }
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updateEvent) {
    this._tripEvents = updateItem(this._tripEvents, updateEvent);
    this._sourceTripEvents = updateItem(this._sourceTripEvents, updateEvent);
    this._pointPresenter.get(updateEvent.id).init(updateEvent);
  }

  _renderNoEvents() {
    render(this._tripEventsElement, this._noEventsTrip, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._tripEventsElement, this._eventsSort, RenderPosition.BEFOREEND);
    this._eventsSort.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(tripEvent) {
    const pointPresenter = new PointPresenter(this._listEventsElement, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(tripEvent);
    this._pointPresenter.set(tripEvent.id, pointPresenter);
  }

  _clearTripEventsList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderTripEvents(tripEvents) {
    render(this._tripEventsElement, this._listEventsElement, RenderPosition.BEFOREEND);
    for (let i = 0; i < tripEvents.length; i++) {
      this._renderEvent(tripEvents[i]);
    }
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripEvents.sort(sortTime);
        break;
      case SortType.PRICE:
        this._tripEvents.sort(sortPrice);
        break;
      default:
        this._tripEvents = this._sourceTripEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearTripEventsList();
    this._renderTripEvents(this._tripEvents);
  }
}
