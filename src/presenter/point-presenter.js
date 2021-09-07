import TripEventView from '../view/event.js';
import PointEditView from '../view/point-view.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '..//utils/common.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(listEventsElement, changeData, changeMode) {
    this._listEventsElement = listEventsElement;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._tripEventElement = null;
    this._eventEditElement = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleRollupButtonFormEditClick = this._handleRollupButtonFormEditClick.bind(this);
    this._handleDeleteFormEditClick = this._handleDeleteFormEditClick.bind(this);
    this._handleSubmitFormEditClick = this._handleSubmitFormEditClick.bind(this);
    this._handleRollupButtonPointClick = this._handleRollupButtonPointClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(tripEvent, destinations, offers) {
    this._tripEvent = tripEvent;

    const prevTripEventElement = this._tripEventElement;
    const prevEventEditElement = this._eventEditElement;

    this._tripEventElement = new TripEventView(tripEvent);
    this._eventEditElement = new PointEditView(tripEvent, destinations, offers);

    this._tripEventElement.setRollupButtonClickHandler(this._handleRollupButtonPointClick);

    this._eventEditElement.setRollupButtonClickHandler(this._handleRollupButtonFormEditClick);

    this._eventEditElement.setDeleteClickHandler(this._handleDeleteFormEditClick);

    this._eventEditElement.setFormSubmitHandler(this._handleSubmitFormEditClick);

    this._tripEventElement.setClickFavoriteHandler(this._handleFavoriteClick);

    if(prevTripEventElement === null || prevEventEditElement === null) {
      render(this._listEventsElement, this._tripEventElement, RenderPosition.BEFOREEND);
      return;
    }

    if(this._mode === Mode.DEFAULT) {
      replace(this._tripEventElement, prevTripEventElement);
    }

    if(this._mode === Mode.EDITING) {
      replace(this._eventEditElement, prevEventEditElement);
    }

    remove(prevTripEventElement);
    remove(prevEventEditElement);
  }

  destroy() {
    remove(this._tripEventElement);
    remove(this._eventEditElement);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._repleceFormEditToPoint();
    }
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._eventEditElement.reset(this._tripEvent);
      this._repleceFormEditToPoint();
    }
  }

  _replecePointToFormEdit() {
    replace(this._eventEditElement, this._tripEventElement);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _repleceFormEditToPoint() {
    replace(this._tripEventElement, this._eventEditElement);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleRollupButtonPointClick() {
    this._replecePointToFormEdit();
  }

  _handleDeleteFormEditClick(tripEvent) {
    this._changeData(UserAction.DELETE_POINT, UpdateType.MAJOR, tripEvent);
  }

  _handleRollupButtonFormEditClick() {
    this._eventEditElement.reset(this._tripEvent);
    this._repleceFormEditToPoint();
  }

  _handleSubmitFormEditClick(tripEvent) {
    this._changeData(UserAction.UPDATE_POINT, UpdateType.MAJOR, tripEvent);
    this._repleceFormEditToPoint();
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._tripEvent,
        {
          favorite: !this._tripEvent.favorite,
        },
      ),
    );
  }
}
