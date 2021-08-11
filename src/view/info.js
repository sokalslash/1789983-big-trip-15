import {humanizeDateForEventAndInfo, createElement} from '../utils.js';


const createNameTrip = (eventData) => {
  if (eventData.length === 1 || eventData.length === 2) {
    return `<h1 class="trip-info__title">${eventData[0].destination.name} &mdash;
     ${eventData[eventData.length-1].destination.name}</h1>`;
  }
  if (eventData.length === 3) {
    return `<h1 class="trip-info__title">${eventData[0].destination.name} &mdash;
      ${eventData[1].destination.name} &mdash; ${eventData[eventData.length-1].destination.name}</h1>`;
  }
  return `<h1 class="trip-info__title">${eventData[0].destination.name} &mdash;
     ... &mdash; ${eventData[eventData.length-1].destination.name}</h1>`;
};

const calculateOffersCost = (points) => {
  const offersCost = [];
  for (const point of points) {
    if (point.offers) {
      offersCost.push(point.offers.reduce((accumulator, element) => accumulator + element.price, 0));
    }
  }
  return offersCost.reduce((accumulator, element) => accumulator + element, 0);
};

const createTripInfoTemplate = (eventData) => {
  const tripInfoCost = eventData.reduce((accumulator, point) => accumulator + point.basePrice, 0);
  const offersConst = calculateOffersCost(eventData);
  const totalTripInfoCost = tripInfoCost + offersConst;
  if (eventData.length !== 0) {
    const {dateFrom} = eventData[0];
    const dateStart = humanizeDateForEventAndInfo(dateFrom);
    const {dateTo} = eventData[eventData.length-1];
    const dateEnd = humanizeDateForEventAndInfo(dateTo);
    const tripInfoTitle = createNameTrip(eventData);

    return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    ${tripInfoTitle}

    <p class="trip-info__dates">${dateStart}&nbsp;&mdash;&nbsp;${dateEnd}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalTripInfoCost}</span>
  </p>
  </section>`;
  }
  return '';
};

export default class TripInfo {
  constructor (eventData) {
    this._eventsTrip = eventData;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._eventsTrip);
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
