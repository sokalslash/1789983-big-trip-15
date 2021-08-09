const createFilterItemTemplate = (filter) => {
  const {name} = filter;
  return `<div class="trip-filters__filter">
  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" checked>
  <label class="trip-filters__filter-label" for="filter-everything">${name}</label>
</div>`;

};


export const createEventsFiltersTemplate = (dateMock) => {
  const filterItemsTemplate = dateMock.map((filter) => createFilterItemTemplate(filter)).join('');

  return `<form class="trip-filters" action="#" method="get">
  ${filterItemsTemplate}
<button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};
