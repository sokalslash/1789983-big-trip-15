import {humanizeDateForEventAndInfo} from '../utils.js';


const createNameTrip = (arrayMocks) => {
  if (arrayMocks.length === 1 || arrayMocks.length === 2) {
    return `<h1 class="trip-info__title">${arrayMocks[0].destination.name} &mdash;
     ${arrayMocks[arrayMocks.length-1].destination.name}</h1>`;
  }
  if (arrayMocks.length === 3) {
    return `<h1 class="trip-info__title">${arrayMocks[0].destination.name} &mdash;
      ${arrayMocks[1].destination.name} &mdash; ${arrayMocks[arrayMocks.length-1].destination.name}</h1>`;
  }
  return `<h1 class="trip-info__title">${arrayMocks[0].destination.name} &mdash;
     ... &mdash; ${arrayMocks[arrayMocks.length-1].destination.name}</h1>`;
};

const calculateOffersCost = (arrayPoint) => {
  const offersCost = [];
  for (const point of arrayPoint) {
    if (point.offers) {
      offersCost.push(point.offers.reduce((accumulator, element) => accumulator + element.price, 0));
    }
  }
  return offersCost.reduce((accumulator, element) => accumulator + element, 0);
};

export const createTripInfoTemplate = (arrayMocks) => {
  const tripInfoCost = arrayMocks.reduce((accumulator, point) => accumulator + point.basePrice, 0);
  const offersConst = calculateOffersCost(arrayMocks);
  const totalTripInfoCost = tripInfoCost + offersConst;
  if (arrayMocks.length !== 0) {
    const {dateFrom} = arrayMocks[0];
    const dateStart = humanizeDateForEventAndInfo(dateFrom);
    const {dateTo} = arrayMocks[arrayMocks.length-1];
    const dateEnd = humanizeDateForEventAndInfo(dateTo);
    const tripInfoTitle = createNameTrip(arrayMocks);

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
