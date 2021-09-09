import AbstractView from './abstract.js';
import {MenuItem} from '../utils/common.js';

const createSiteMenuTemplate = () => (`<nav class="trip-controls__trip-tabs  trip-tabs">
<a class="trip-tabs__btn  trip-tabs__btn--active ${MenuItem.POINTS}" href="#">Table</a>
<a class="trip-tabs__btn ${MenuItem.STATISTICS}" href="#">Stats</a>
</nav>`);

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`.${menuItem}`);

    if (item !== null) {
      item.desabled = false;
    }
  }
}
