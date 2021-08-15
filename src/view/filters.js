import AbstractView from './abstract.js';

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

export default class EventsFilters extends AbstractView {
  constructor(filterData) {
    super();
    this._filters = filterData;
  }

  getTemplate() {
    return createEventsFiltersTemplate(this._filters);
  }
}
