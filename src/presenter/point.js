import TripEventView from '../view/event.js';
import PointEditView from '../view/edit-point.js';
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

    this._eventTrip = null;
    this._eventEdit = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlerRollupButtonOrSubmitFormEdit = this._handlerRollupButtonOrSubmitFormEdit.bind(this);
    this._handlerRollupButtonPoint = this._handlerRollupButtonPoint.bind(this);
    this._handlerFavoriteClick = this._handlerFavoriteClick.bind(this);
  }

  init(eventOfTrip) {
    this._eventOfTrip = eventOfTrip;

    const prevEventTrip = this._eventTrip;
    const prevEventEdit = this._eventEdit;

    this._eventTrip = new TripEventView(eventOfTrip);
    this._eventEdit = new PointEditView(eventOfTrip);

    this._eventTrip.setClickHandler(this._handlerRollupButtonPoint);

    this._eventEdit.setClickHandler(this._handlerRollupButtonOrSubmitFormEdit);

    this._eventEdit.setFormSubmitHandler(this._handlerRollupButtonOrSubmitFormEdit);

    this._eventTrip.setClickFavoriteHandler(this._handlerFavoriteClick);

    if(prevEventTrip === null || prevEventEdit === null) {
      render(this._listEventsElement, this._eventTrip, RenderPosition.BEFOREEND);
      return;
    }

    if(this._mode === Mode.DEFAULT) {
      replace(this._eventTrip, prevEventTrip);
    }

    if(this._mode === Mode.EDITING) {
      replace(this._eventEdit, prevEventEdit);
    }

    remove(prevEventTrip);
    remove(prevEventEdit);
  }

  destroy() {
    remove(this._eventTrip);
    remove(this._eventEdit);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._repleceFormEditToPoint();
    }
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replace(this._eventTrip, this._eventEdit);
      this._mode = Mode.DEFAULT;
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _replecePointToFormEdit() {
    replace(this._eventEdit, this._eventTrip);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _repleceFormEditToPoint() {
    replace(this._eventTrip, this._eventEdit);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handlerRollupButtonPoint() {
    this._replecePointToFormEdit();
  }

  _handlerRollupButtonOrSubmitFormEdit() {
    this._repleceFormEditToPoint();
  }

  _handlerFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._eventOfTrip,
        {
          favorite: !this._eventOfTrip.favorite,
        },
      ),
    );
  }
}
