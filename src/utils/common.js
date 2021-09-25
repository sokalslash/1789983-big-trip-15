export const Time = {
  ONE_MINUTE: 60000,
  ONE_HOUR: 3600000,
  ONE_DAY: 86400000,
};

export const MenuItem = {
  ADD_NEW_POINT: 'trip-main__event-add-btn',
  POINTS: 'Table',
  STATISTICS: 'Stats',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const isOnline = () => window.navigator.onLine;
