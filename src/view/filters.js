import AbstractView from './abstract.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return `<div class="trip-filters__filter">
  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" ${type === currentFilterType ? 'checked' : ''} value="${type}" ${count === 0 ? 'disabled' : ''}>
  <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
</div>`;

};

const createEventsFiltersTemplate = (filtes, currentFilterType) => {
  const filterItemsTemplates = filtes.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

  return `<form class="trip-filters" action="#" method="get">
  ${filterItemsTemplates}
<button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class EventsFilters extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createEventsFiltersTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}
