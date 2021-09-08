import dayjs from 'dayjs';

const isCurкent = (point) => dayjs().isAfter(dayjs(point.dateFrom), 'D') && dayjs().isBefore(dayjs(point.dateTo), 'D');

const isFutures = (point) => dayjs().isBefore(dayjs(point.dateFrom), 'D') || dayjs().isSame(dayjs(point.dateFrom), 'D') || isCurкent(point);

const isPast = (point) => dayjs().isAfter(dayjs(point.dateTo), 'D') || isCurкent(point);

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURES: 'futures',
  PAST: 'past',
};

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURES]: (points) => points.filter((point) => isFutures(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point)),
};
