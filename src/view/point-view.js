import {humanizeDateForPoint, humanizeDateForAttributeEvent, pointTypeIcon} from '../utils/point-util.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const EMPTY_EVENT = {
  type: '',
  availableCities: [],
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  offers: [],
  dateFrom: new Date(),
  dateTo: new Date(),
  basePrice: '',
  isNewPoint: true,
};

const createOptionForCity = (city) => (`<option value="${city}">${city}</option>`);

const createOfferCheckbox = (offer, isDisabled) => {
  const wordsForAttribute = offer.title.split(' ').join('-');
  return `<div class="event__available-offers">
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${wordsForAttribute}-1" type="checkbox" name="event-offer-${wordsForAttribute}" ${offer.isChecked ? 'checked' : '' } ${isDisabled ? 'disabled' : ''}>
    <label class="event__offer-label" for="event-offer-${wordsForAttribute}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
} ;

const createEventSectionOffers = (offers, isDisabled) => {
  if (offers && offers.length !== 0) {
    const availableOffers = offers.map((offer) => createOfferCheckbox(offer, isDisabled)).join(' ');
    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    ${availableOffers}
  </section>`;
  }
  return '';
};

const createImageDestination = (pathForImg) => (`<img class="event__photo" src="${pathForImg.src}" alt="${pathForImg.description}">`);

const createDestinationDescription = (descriptions) => {
  if (descriptions) {
    return `<p class="event__destination-description">${descriptions}</p>`;
  }
  return '';
};

const createDstinationPictures = (pictures) => {
  if (pictures && pictures.length !== 0) {
    const listImagesDestination = pictures.map((element) => createImageDestination(element)).join(' ');
    return `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${listImagesDestination}
      </div>
    </div>`;
  }
  return '';
};

const createEventSectionDestination = (destination) => {
  if (destination.description && destination.description.length !== 0 || destination.pictures && destination.pictures.length !== 0) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${createDestinationDescription(destination.description)}
    ${createDstinationPictures(destination.pictures)}
  </section>`;
  }
  return '';
};

const createPointEditTemplate = (conditionData, cities) => {
  const {destination, dateFrom, dateTo, basePrice, offers, type, isDisabled, isSaving, isDeleting, isNewPoint} = conditionData;
  const listOptionCities = cities.map((availableCity) => createOptionForCity(availableCity)).join(' ');
  const dateStart = humanizeDateForPoint(dateFrom);
  const dateEnd = humanizeDateForPoint(dateTo);
  const offersConteiner = createEventSectionOffers(offers);
  const destinationConteiner = createEventSectionDestination(destination);

  return `<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="${type ? pointTypeIcon[type] : 'img/logo.png'}" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
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
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
      <datalist id="destination-list-1">
      ${listOptionCities}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}" ${isDisabled ? 'disabled' : ''}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}" ${isDisabled ? 'disabled' : ''}>
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
    <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
    <button class="event__rollup-btn" type="button"${isNewPoint ? 'disabled' : ''}>
    <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    ${offersConteiner}
    ${destinationConteiner}
  </section>
</form>
</li>`;
};

export default class PointEdit extends SmartView {
  constructor(destinations, offers, cities, tripEvent = EMPTY_EVENT) {
    super();
    this._destinations = destinations;
    this._offers = offers;
    this._cities = cities;
    this._conditionData = PointEdit.parseInformationToCondition(tripEvent);
    this._datapickerForStart = null;
    this._datapickerForEnd = null;


    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeGroupClickHandler = this._typeGroupClickHandler.bind(this);
    this._checkboxOfferClickHandler = this._checkboxOfferClickHandler.bind(this);
    this._destinationChangekHandler = this._destinationChangekHandler.bind(this);
    this._priceChangekHandler = this._priceChangekHandler.bind(this);
    this._getDestinationForUpdate = this._getDestinationForUpdate.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickerForStart();
    this._setDatepickerForEnd();

    this._getValidationInputType();
  }

  removeElement() {
    super.removeElement();

    if (this._datapickerForStart) {
      this._datapickerForStart.destroy();
      this._datapickerForStart = null;
    }

    if (this._datapickerForEnd) {
      this._datapickerForEnd.destroy();
      this._datapickerForEnd = null;
    }
  }

  getTemplate() {
    return createPointEditTemplate(this._conditionData, this._cities);
  }

  _getValidationInputType() {
    const inputType = this.getElement().querySelector('#event-type-toggle-1');
    const imegeType = this.getElement().querySelector('.event__type-icon');
    if (imegeType.src.endsWith('img/logo.png')) {
      inputType.required = true;
    }

    this.getElement().querySelector('#event-destination-1').required = true;

    this.getElement().querySelector('#event-price-1').required = true;
  }

  _getDestinationForUpdate(markerForSearch, destinations) {
    destinations.find((destination) => markerForSearch === destination.nameCity);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('click', this._typeGroupClickHandler);
    this.getElement().querySelector('.event__details').addEventListener('click', this._checkboxOfferClickHandler);
    this.getElement().querySelector('#event-destination-1').addEventListener('change', this._destinationChangekHandler);
    this.getElement().querySelector('#event-price-1').addEventListener('change', this._priceChangekHandler);
  }

  _priceChangekHandler(evt) {
    this.updateData({
      basePrice: +evt.target.value,
    });
  }

  _destinationChangekHandler(evt) {
    if (this._cities.includes(evt.target.value)) {
      this.updateData({
        destination: this._destinations.find((destination) => evt.target.value === destination.name),
      });
    }
  }

  _checkboxOfferClickHandler(evt) {
    if (evt.target.nodeName === 'INPUT') {
      const IndexOfferChecked = this._conditionData.offers.findIndex((offer) => offer.title.includes(evt.target.labels[0].childNodes[1].innerText));
      const oldOffers = this._conditionData.offers;

      const offerChecked = Object.assign(
        {},
        this._conditionData.offers[IndexOfferChecked],
        {
          isChecked: evt.target.checked,
        },
      );

      const newOffers = [
        ...oldOffers.slice(0, IndexOfferChecked),
        offerChecked,
        ...oldOffers.slice(IndexOfferChecked + 1),
      ];

      this.updateData({
        offers: newOffers,
      });
    }
  }

  _typeGroupClickHandler(evt) {
    if (evt.target.value) {
      const newOffers = this._offers.find((offer) => offer.type === evt.target.value);
      this.updateData({
        type: evt.target.value,
        offers: newOffers.offers,
      });
    }
  }

  _deleteClickHandler() {
    this._callback.deleteClick(PointEdit.parseConditionToInformation(this._conditionData));
  }

  _rollupButtonClickHandler() {
    this._callback.editClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseConditionToInformation(this._conditionData));
  }

  _setDatepickerForStart() {
    if (this._datapickerForStart) {
      this._datapickerForStart.destroy();
      this._datapickerForStart = null;
    }

    this._datapickerForStart = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'j/m/y H:i',
        defaultDate: humanizeDateForPoint(this._conditionData.dateFrom),
        onChange: this._startTimeChangeHandler,
      },
    );
  }

  _setDatepickerForEnd() {
    if (this._datapickerForEnd) {
      this._datapickerForEnd.destroy();
      this._datapickerForEnd = null;
    }

    this._datapickerForEnd = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        enableTime: true,
        minDate: humanizeDateForAttributeEvent(this._conditionData.dateFrom),
        dateFormat: 'j/m/y H:i',
        defaultDate: humanizeDateForPoint(this._conditionData.dateTo),
        onChange: this._endTimeChangeHandler,
      },
    );
  }

  _startTimeChangeHandler([userData]) {
    this.updateData({
      dateFrom: userData,
    });
  }

  _endTimeChangeHandler([userData]) {
    this.updateData({
      dateTo: userData,
    });
  }

  reset(tripEvent) {
    this.updateData(PointEdit.parseInformationToCondition(tripEvent));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickerForStart();
    this._setDatepickerForEnd();
    this.setRollupButtonClickHandler(this._callback.editClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  restoreValidation() {
    this._getValidationInputType();
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deleteClickHandler);
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
    const checkedOffers = [];
    for (const offer of information.offers) {
      checkedOffers.push(
        Object.assign(
          {},
          offer,
          {
            isChecked: true,
          },
        ),
      );
    }

    const isNewPoint = Boolean(information.isNewPoint);

    return Object.assign(
      {},
      information,
      {
        offers: checkedOffers,
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
        isNewPoint,
      },
    );
  }

  static parseConditionToInformation(condition) {
    const checkedOffers = [];
    for (const offer of condition.offers) {
      if (offer.isChecked) {
        checkedOffers.push(offer);
      }
      delete offer.isChecked;
    }

    condition = Object.assign(
      {},
      condition,
      {
        offers: checkedOffers,
      },
    );

    delete condition.isDisabled;
    delete condition.isSaving;
    delete condition.isDeleting;
    delete condition.isNewPoint;

    return condition;
  }
}
