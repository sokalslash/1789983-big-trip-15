import {humanizeDateForEventAndInfo} from '../utils/point-util.js';
import AbstractView from './abstract.js';

const createNameTrip = (tripEvents) => {
  if (tripEvents.length === 1 || tripEvents.length === 2) {
    return `<h1 class="trip-info__title">${tripEvents[0].destination.name} &mdash;
     ${tripEvents[tripEvents.length-1].destination.name}</h1>`;
  }
  if (tripEvents.length === 3) {
    return `<h1 class="trip-info__title">${tripEvents[0].destination.name} &mdash;
      ${tripEvents[1].destination.name} &mdash; ${tripEvents[tripEvents.length-1].destination.name}</h1>`;
  }
  return `<h1 class="trip-info__title">${tripEvents[0].destination.name} &mdash;
     ... &mdash; ${tripEvents[tripEvents.length-1].destination.name}</h1>`;
};

// const calculateOffersCost = (points) => {
//   const offersCost = [];
//   for (const point of points) {
//     if (point.offers) {
//       offersCost.push(point.offers.reduce((accumulator, element) => accumulator + element.price, 0));
//     }
//   }
//   return offersCost.reduce((accumulator, element) => accumulator + element, 0);
// };

const createTripInfoTemplate = (tripEvents) => {
  const tripInfoCost = tripEvents.reduce((accumulator, point) => accumulator + point.basePrice, 0);
  //const offersConst = calculateOffersCost(tripEvents);
  const totalTripInfoCost = tripInfoCost;
  if (tripEvents.length !== 0) {
    const {dateFrom} = tripEvents[0];
    const dateStart = humanizeDateForEventAndInfo(dateFrom);
    const {dateTo} = tripEvents[tripEvents.length-1];
    const dateEnd = humanizeDateForEventAndInfo(dateTo);
    const tripInfoTitle = createNameTrip(tripEvents);

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

export default class TripInfo extends AbstractView {
  constructor (tripEvents) {
    super();
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripEvents);
  }
}
