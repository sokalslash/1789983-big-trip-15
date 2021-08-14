import {humanizeDateForEventAndInfo, humanizeTimeForEvent, humanizeDateForAttributeEvent, createElement} from '../utils.js';

const createOfferListItemTemplete = (offer) => (`<li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</li>`);

const createOffersContainer = (offers) => {
  if (offers && offers.length !== 0) {
    const offersList = offers.map((offer) => createOfferListItemTemplete(offer)).join('');
    return   `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">${offersList}</ul>`;
  }
  return '';
};

const isFavorite = (flag) => {
  if(flag) {
    return 'event__favorite-btn--active';
  }
  return '';
};

const createTripEventTemplate = (eventData) => {
  if (eventData && eventData.length !== 0) {
    const {dateFrom, dateTo, dateDifference, type, destination, basePrice, offers, favorite} = eventData;
    const dateForStart = humanizeDateForEventAndInfo(dateFrom);
    const dateForAttributeStart = humanizeDateForAttributeEvent(dateFrom);
    const dateForAttributeTimeStart = humanizeDateForAttributeEvent(dateFrom);
    const dateForTimeStart = humanizeTimeForEvent(dateFrom);
    const dateForAttributeTimeAnd = humanizeDateForAttributeEvent(dateTo);
    const dateForTimeAnd = humanizeTimeForEvent(dateTo);
    const offersContainer = createOffersContainer(offers);
    const favoriteActive = isFavorite(favorite);

    return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dateForAttributeStart}">${dateForStart}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src=${type.iconPoint} alt="Event type icon">
    </div>
    <h3 class="event__title">${type.typePoint} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateForAttributeTimeStart}">${dateForTimeStart}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateForAttributeTimeAnd}">${dateForTimeAnd}</time>
      </p>
      <p class="event__duration">${dateDifference}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    ${offersContainer}
    <button class="event__favorite-btn ${favoriteActive}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>`;
  }
  return '';
};

export default class TripEvent {
  constructor(eventData) {
    this.__eventsTrip = eventData;
    this._element = null;
  }

  getTemplate() {
    return createTripEventTemplate(this.__eventsTrip);
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

  onButtonRollupClick(container, replaceTo) {
    container.replaceChild(replaceTo, this.getElement());
  }
}
