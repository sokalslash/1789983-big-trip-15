import TripEventView from '../view/event.js';
import PointEditView from '../view/point-view.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '..//utils/common.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class Point {
  constructor(listEventsElement, changeData, changeMode) {
    this._listEventsElement = listEventsElement;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._tripEventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleRollupButtonFormEditClick = this._handleRollupButtonFormEditClick.bind(this);
    this._handleDeleteFormEditClick = this._handleDeleteFormEditClick.bind(this);
    this._handleSubmitFormEditClick = this._handleSubmitFormEditClick.bind(this);
    this._handleRollupButtonPointClick = this._handleRollupButtonPointClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(tripEvent, destinations, offers, cities) {
    this._tripEvent = tripEvent;

    const prevTripEventComponent = this._tripEventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._tripEventComponent = new TripEventView(tripEvent);
    this._eventEditComponent = new PointEditView(destinations, offers, cities, tripEvent);

    this._tripEventComponent.setRollupButtonClickHandler(this._handleRollupButtonPointClick);

    this._eventEditComponent.setRollupButtonClickHandler(this._handleRollupButtonFormEditClick);

    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteFormEditClick);

    this._eventEditComponent.setFormSubmitHandler(this._handleSubmitFormEditClick);

    this._tripEventComponent.setClickFavoriteHandler(this._handleFavoriteClick);

    if(prevTripEventComponent === null || prevEventEditComponent === null) {
      render(this._listEventsElement, this._tripEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if(this._mode === Mode.DEFAULT) {
      replace(this._tripEventComponent, prevTripEventComponent);
    }

    if(this._mode === Mode.EDITING) {
      replace(this._tripEventComponent, prevTripEventComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevTripEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._tripEventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._repleceFormEditToPoint();
    }
  }

  setViewState(state) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._eventEditComponent.shake(resetFormState);
        break;
    }
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._eventEditComponent.reset(this._tripEvent);
      this._repleceFormEditToPoint();
    }
  }

  _replecePointToFormEdit() {
    replace(this._eventEditComponent, this._tripEventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _repleceFormEditToPoint() {
    replace(this._tripEventComponent, this._eventEditComponent);
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
    this._eventEditComponent.reset(this._tripEvent);
    this._repleceFormEditToPoint();
  }

  _handleSubmitFormEditClick(tripEvent) {
    this._changeData(UserAction.UPDATE_POINT, UpdateType.MAJOR, tripEvent);
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
