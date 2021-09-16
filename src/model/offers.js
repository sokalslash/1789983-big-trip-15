export default class Offers {
  constructor() {
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers;
    console.log(this._offers);
  }

  getOffers() {
    console.log(this._offers);
    return this._offers;
  }
}
