import PointEditView from '../view/point-view.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../utils/common.js';

export default class PointNew {
  constructor(tripEventsElement, changeData) {
    this._tripEventsElement = tripEventsElement;
    this._changeData = changeData;

    this._pointEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(destination, offers, cities, callback) {
    this._destroyCallback = callback;

    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new PointEditView(destination, offers,cities);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._tripEventsElement, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;
    document.removeEventListener('keydown', this._escKeyDownHandler);
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  }

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(tripEvent) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      tripEvent,
    );
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}

