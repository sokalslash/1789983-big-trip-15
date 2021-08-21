import ListEventsView from '../view/list-events.js';
import NoEventsTripView from '../view/no-events.js';
import EventsSortView from '../view/sort.js';
import PointPresenter from './point.js';
import {RenderPosition, render} from '../utils/render.js';
import {updateItem} from '../utils/common';

const NO_EVENTS = 0;

export default class Trip {
  constructor(tripEventsElement) {
    this._tripEventsElement = tripEventsElement;
    this._pointPresenter = new Map();

    this._listEventsElement = new ListEventsView();
    this._noEventsTrip = new NoEventsTripView();
    this._eventsSort = new EventsSortView();

    this._handlerPointChange = this._handlerPointChange.bind(this);
  }

  init(eventData) {
    this._eventData = eventData.slice();
    if(this._eventData.length === NO_EVENTS) {
      this._renderNoEvents();
    } else {
      this._renderSort();
      this._renderEventsTrip(this._eventData);
    }
  }

  _handlerPointChange(updateEvent) {
    this._eventData = updateItem(this._eventData, updateEvent);
    this._pointPresenter.get(updateEvent.id).init(updateEvent);
  }

  _renderNoEvents() {
    render(this._tripEventsElement, this._noEventsTrip, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._tripEventsElement, this._eventsSort, RenderPosition.BEFOREEND);
  }

  _renderEvent(eventOfTrip) {
    const pointPresenter = new PointPresenter(this._listEventsElement, this._handlerPointChange);
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
}
