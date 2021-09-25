import PointsModel from '../model/points.js';
import {isOnline, UpdateType} from '../utils/common.js';

const getSyncedPoints = (items) =>
  items
    .filter(({success}) => success)
    .map(({payload}) => payload.point);

const createStoreStructure = (items) =>
  items
    .reduce((accumulator, current) => Object.assign(
      {},
      accumulator,
      {
        [current.id]: current,
      },
    ), {});

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSync = false;
  }

  get isSync() {
    return this._isSync;
  }

  set isSync(value) {
    this._isSync = value;
  }

  getPoints() {
    if (isOnline) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map((PointsModel.adaptToServer)));
          this._store.setItems(items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems());

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  updatePoint(updateType, point) {
    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatePoint) => {
          this._store.setItem(updatePoint.id, PointsModel.adaptToServer(updatePoint));
          return updatePoint;
        });
    }

    if (updateType === UpdateType.PATCH) {
      this._isSync = true;
      this._store.setItem(point.id, PointsModel.adaptToServer(point));

      return Promise.resolve(point);
    }

    return Promise.reject(new Error('Update point failed'));
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    return Promise.reject(new Error('Add point failed'));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem(point.id));
    }

    return Promise.reject(new Error('Delete point failed'));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then((response) => {

          const updatePoints = getSyncedPoints(response.updated);

          const items = createStoreStructure(updatePoints);

          this._store.setItems(items);
        });
    }

    return Promise.rejected(new Error(new Error('Sync data failed')));
  }
}
