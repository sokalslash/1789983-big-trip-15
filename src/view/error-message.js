import AbstractView from './abstract.js';

const createMessageErrorTemplate = (messaige) => (
  `<p class="trip-events__msg">${messaige}</p>`
);

export default class Error extends AbstractView{
  constructor(error) {
    super();

    this._error = error;
  }

  getTemplate() {
    return createMessageErrorTemplate(this._error);
  }
}
