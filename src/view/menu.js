import AbstractView from './abstract.js';
import {MenuItem} from '../utils/common.js';

const TabItem = {
  TABLE: 0,
  STATS: 1,
};

const createSiteMenuTemplate = () => (`<nav class="trip-controls__trip-tabs  trip-tabs">
<a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
<a class="trip-tabs__btn" href="#">Stats</a>
</nav>`);

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);

    this._tabsItems = this.getElement().querySelectorAll('.trip-tabs__btn');
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.textContent);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    switch (menuItem) {
      case MenuItem.POINTS:
        this._tabsItems[TabItem.STATS].classList.remove('trip-tabs__btn--active');
        this._tabsItems[TabItem.TABLE].classList.add('trip-tabs__btn--active');
        break;
      case MenuItem.STATISTICS:
        this._tabsItems[TabItem.TABLE].classList.remove('trip-tabs__btn--active');
        this._tabsItems[TabItem.STATS].classList.add('trip-tabs__btn--active');
        break;
    }
  }

  removeMenuItem() {
    this._tabsItems.forEach((tabItem) => tabItem.classList.remove('trip-tabs__btn--active'));
  }
}
