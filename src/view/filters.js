import {createElement} from '../utils.js';

const createFilterItemTemplate = (filter) => {
  const {name} = filter;
  return `<div class="trip-filters__filter">
  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" checked>
  <label class="trip-filters__filter-label" for="filter-everything">${name}</label>
</div>`;

};

const createEventsFiltersTemplate = (filterData) => {
  const filterItemsTemplate = filterData.map((filter) => createFilterItemTemplate(filter)).join('');

  return `<form class="trip-filters" action="#" method="get">
  ${filterItemsTemplate}
<button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class EventsFilters {
  constructor(filterData) {
    this._filters = filterData;
    this._element = null;
  }

  getTemplate() {
    return createEventsFiltersTemplate(this._filters);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
