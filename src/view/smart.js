import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._conditionData = {};
  }

  updateData(update) {
    if(!update) {
      return;
    }

    this._conditionData = Object.assign(
      {},
      this._conditionData,
      update,
    );

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
    this.restoreValidation();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }

  restoreValidation() {
    throw new Error ('Abstract method not implemented: restoreValidation');
  }
}


