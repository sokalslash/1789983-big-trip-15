export default class Destinations {
  constructor() {
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  getDestinations() {
    return this._destinations;
  }

  getCities() {
    if (this._destinations.length !== 0) {
      const cities = this._destinations.map((destination) => destination.name);
      return cities;
    }
    return [];
  }
}
