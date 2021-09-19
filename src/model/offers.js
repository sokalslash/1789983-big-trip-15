export default class Offers {
  constructor() {
    this._offers = null;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  getOffers() {
    return this._offers;
  }
}
