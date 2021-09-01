import {humanizeDateForPoint, pointTypeIcon} from '../utils/point-util.js';
import SmartView from './smart.js';

const EMPTY_EVENT = {
  type: 'flight',
  availableCities: [
    'Salzburg',
    'Washington',
    'Cairo',
    'Galway',
    'Bonn',
    'La-Paz',
    'Kochi',
    'Vancouver',
    'Dubai',
    'Denver',
  ],
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  destinationCity: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  basePrice: '',
};

const createOptionForCity = (city) => (`<option value="${city}">${city}</option>`);

const getOffers = (offers, type) => offers.find((offer) => offer.type === type);

const createOfferCheckbox = (offer) => {
  const wordForAttribute = offer.title.split(' ').pop();
  return `<div class="event__available-offers">
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${wordForAttribute}-1" type="checkbox" name="event-offer-${wordForAttribute}"${offer.isChecked ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${wordForAttribute}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
} ;

const createEventSectionOffers = (offers) => {
  if (offers && offers.length !== 0) {
    const availableOffers = offers.map((offer) => createOfferCheckbox(offer)).join(' ');
    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    ${availableOffers}
  </section>`;
  }
  return '';
};

const createImageDestination = (pathForImg) => (`<img class="event__photo" src="${pathForImg.src}" alt="${pathForImg.description}">`);

const createDstinationDescription = (descriptions) => {
  if (descriptions && descriptions.length !== 0) {
    const destinationDescription = descriptions.join(' ');
    return `<p class="event__destination-description">${destinationDescription}</p>`;
  }
  return '';
};

const createDstinationPictures = (pictures) => {
  if (pictures && pictures.length !== 0) {
    const listImageDestination = pictures.map((element) => createImageDestination(element)).join(' ');
    return `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${listImageDestination}
      </div>
    </div>`;
  }
  return '';
};

const createEventSectionDestination = (destination) => {
  if (destination.description && destination.description.length !== 0 || destination.pictures && destination.pictures.length !== 0) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${createDstinationDescription(destination.description)}
    ${createDstinationPictures(destination.pictures)}
  </section>`;
  }
  return '';
};

const getDestination = (destination, destinationCity) => destination.find((destinationAvailable) => destinationAvailable.nameCity === destinationCity);

const createDestination = (destination, destinationCity) => {
  const destinationFotPoint = getDestination(destination, destinationCity);
  const destinationConteiner = createEventSectionDestination(destinationFotPoint);
  return destinationConteiner;
};

const createPointEditTemplate = (conditionData) => {
  const {type, availableCities, destination, dateFrom, dateTo, basePrice, offers, destinationCity} = conditionData;
  const listOptionCities = availableCities.map((city) => createOptionForCity(city)).join(' ');
  const dateStart = humanizeDateForPoint(dateFrom);
  const dateEnd = humanizeDateForPoint(dateTo);
  const offersForPointType = getOffers(offers, type);
  const offersConteiner = createEventSectionOffers(offersForPointType.offersAvailable);

  return `<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="${pointTypeIcon[type]}" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
            <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationCity ? destinationCity : 'Сhoose a city'}" list="destination-list-1">
      <datalist id="destination-list-1">
      ${listOptionCities}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
    <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
  </header>
  <section class="event__details">
    ${offersConteiner}
    ${destinationCity ? createDestination(destination, destinationCity) : ''}
  </section>
</form>
</li>`;
};

export default class PointEdit extends SmartView {
  constructor(tripEvent = EMPTY_EVENT) {
    super();
    this._conditionData = PointEdit.parseInformationToCondition(tripEvent);

    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._cancelClickHandler = this._cancelClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeGroupClickHandler = this._typeGroupClickHandler.bind(this);
    this._checkboxOfferClickHandler = this._checkboxOfferClickHandler.bind(this);
    this._destinationClickHandler = this._destinationClickHandler.bind(this);

    this._serInnerHandlers();
  }

  getTemplate() {
    return createPointEditTemplate(this._conditionData, this._offers);
  }

  _serInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('click', this._typeGroupClickHandler);
    this.getElement().querySelector('.event__details').addEventListener('click', this._checkboxOfferClickHandler);
    this.getElement().querySelector('#event-destination-1').addEventListener('change', this._destinationClickHandler);
  }

  _destinationClickHandler(evt) {
    this.updateData({
      destinationCity: evt.target.value,
    });
  }

  _checkboxOfferClickHandler(evt) {
    if (evt.target.nodeName === 'INPUT') {
      const offersForPointType = this._conditionData.offers.find((offer) => offer.type.includes(this._conditionData.type));
      const IndexOffersForPointType = this._conditionData.offers.findIndex((offer) => offer.type.includes(this._conditionData.type));
      const IndexofferAvailable = offersForPointType.offersAvailable.findIndex((offerAvailable) =>  offerAvailable.title.includes(evt.target.labels[0].childNodes[1].innerText));
      const oldOffersAvailable = this._conditionData.offers[IndexOffersForPointType].offersAvailable;

      const offerAvailableChecked = Object.assign(
        {},
        offersForPointType.offersAvailable[IndexofferAvailable],
        {
          isChecked: evt.target.checked,
        },
      );

      const newOffersAvailable = [
        ...oldOffersAvailable.slice(0, IndexofferAvailable),
        offerAvailableChecked,
        ...oldOffersAvailable.slice(IndexofferAvailable + 1),
      ];

      const newOffersForPointType = Object.assign(
        {},
        offersForPointType,
        {
          offersAvailable: newOffersAvailable,
        },
      );

      const newOffers = [
        ...this._conditionData.offers.slice(0, IndexOffersForPointType),
        newOffersForPointType,
        ...this._conditionData.offers.slice(IndexOffersForPointType + 1),
      ];

      this.updateData({
        offers: newOffers,
      });
    }
  }

  _typeGroupClickHandler(evt) {
    if (evt.target.value) {
      for (let i = 0; i < this._conditionData.offers.length; i++) {
        this._conditionData.offers[i].offersAvailable.forEach((offerAvailable) => delete offerAvailable.isChecked);
      }

      this.updateData({
        type: evt.target.value,
      });
    }
  }

  _cancelClickHandler() {
    this._callback.cancelClick();
  }

  _rollupButtonClickHandler() {
    this._callback.editClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseConditionToInformation(this._conditionData));
  }

  reset(tripEvent) {
    this.updateData(PointEdit.parseInformationToCondition(tripEvent));
  }

  restoreHandlers() {
    this._serInnerHandlers();
    this.setRollupButtonClickHandler(this._callback.editClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCancelClickHandler(this._callback.cancelClick);
  }

  setCancelClickHandler(callback) {
    this._callback.cancelClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._cancelClickHandler);
  }

  setRollupButtonClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupButtonClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  static parseInformationToCondition(information) {
    return Object.assign({}, information);
  }

  static parseConditionToInformation(condition) {
    condition = Object.assign({}, condition);
    return condition;
  }
}
