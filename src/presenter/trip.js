import ListEventsView from '../view/list-events.js';
import NoEventsTripView from '../view/no-events.js';
import EventsSortView from '../view/sort.js';
import PointPresenter from './point.js';
import {RenderPosition, render} from '../utils/render.js';
import {updateItem} from '../utils/common';
import {SortType, sortTime, sortPrice} from '../utils/point';

const NO_EVENTS = 0;

export default class Trip {
  constructor(tripEventsElement) {
    this._tripEventsElement = tripEventsElement;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._listEventsElement = new ListEventsView();
    this._noEventsTrip = new NoEventsTripView();
    this._eventsSort = new EventsSortView();

    this._handlerPointChange = this._handlerPointChange.bind(this);
    this._handlerModeChange = this._handlerModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(eventData) {
    this._eventData = eventData.slice();
    this._sourceEventData = eventData.slice();

    if(this._eventData.length === NO_EVENTS) {
      this._renderNoEvents();
    } else {
      this._renderSort();
      this._renderEventsTrip(this._eventData);
    }
  }

  _handlerModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlerPointChange(updateEvent) {
    this._eventData = updateItem(this._eventData, updateEvent);
    this._sourceEventData = updateItem(this._sourceEventData, updateEvent);
    this._pointPresenter.get(updateEvent.id).init(updateEvent);
  }

  _renderNoEvents() {
    render(this._tripEventsElement, this._noEventsTrip, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._tripEventsElement, this._eventsSort, RenderPosition.BEFOREEND);
    this._eventsSort.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(eventOfTrip) {
    const pointPresenter = new PointPresenter(this._listEventsElement, this._handlerPointChange, this._handlerModeChange);
    pointPresenter.init(eventOfTrip);
    this._pointPresenter.set(eventOfTrip.id, pointPresenter);
  }

  _clearListEventsTrip() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderEventsTrip(eventsTrip) {
    render(this._tripEventsElement, this._listEventsElement, RenderPosition.BEFOREEND);
    for (let i = 0; i < eventsTrip.length; i++) {
      this._renderEvent(eventsTrip[i]);
    }
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._eventData.sort(sortTime);
        break;
      case SortType.PRICE:
        this._eventData.sort(sortPrice);
        break;
      default:
        this._eventData = this._sourceEventData.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearListEventsTrip();
    this._renderEventsTrip(this._eventData);
  }
}
