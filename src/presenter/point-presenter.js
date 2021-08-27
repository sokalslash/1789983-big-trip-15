import TripEventView from '../view/event.js';
import PointEditView from '../view/point-view.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';

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
    this._handleRollupButtonOrSubmitFormEdit = this._handleRollupButtonOrSubmitFormEdit.bind(this);
    this._handleRollupButtonPoint = this._handleRollupButtonPoint.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(tripEvent) {
    this._tripEvent = tripEvent;

    const prevTripEventElement = this._tripEventElement;
    const prevEventEditElement = this._eventEditElement;

    this._tripEventElement = new TripEventView(tripEvent);
    this._eventEditElement = new PointEditView(tripEvent);

    this._tripEventElement.setRollupButtonClickHandler(this._handleRollupButtonPoint);

    this._eventEditElement.setClickHandler(this._handleRollupButtonOrSubmitFormEdit);

    this._eventEditElement.setFormSubmitHandler(this._handleRollupButtonOrSubmitFormEdit);

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
      replace(this._tripEventElement, this._eventEditElement);
      this._mode = Mode.DEFAULT;
      document.removeEventListener('keydown', this._escKeyDownHandler);
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

  _handleRollupButtonPoint() {
    this._replecePointToFormEdit();
  }

  _handleRollupButtonOrSubmitFormEdit() {
    this._repleceFormEditToPoint();
  }

  _handleFavoriteClick() {
    this._changeData(
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
