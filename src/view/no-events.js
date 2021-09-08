import AbstractView from './abstract.js';
import {FilterType} from '../utils/filter-util.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURES]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createNoPoitTemplate = (filterType) => {
  const noPointTextValue = NoPointsTextType[filterType];

  return `<p class="trip-events__msg">${noPointTextValue}</p>`;
};

export default class NoEventsTrip extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoPoitTemplate(this._data);
  }
}
