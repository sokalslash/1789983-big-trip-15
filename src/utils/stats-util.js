import dayjs from 'dayjs';
import {Time} from './common';

export const BAR_HEIGHT = 55;

export const typesOfPoints = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const getCostByPointType = (type, points) =>
  points
    .filter((point) => point.type === type)
    .reduce((amount, point) => amount + point.basePrice, 0);

export const getTypeCount = (type, points) =>
  points
    .filter((point) => point.type === type).length;

export const getPointsForType = (type, points) =>
  points
    .filter((point) => point.type === type);

export const getTimeDifference = (dateTo, dateFrom) => {
  const endDate = dayjs(dateTo);
  const startDate = dayjs(dateFrom);
  return endDate.diff(startDate);

};

export const getHumanizedTime = (time) => {
  if (time < Time.ONE_HOUR) {
    const differenceMinutes = time / Time.ONE_MINUTE;
    return `${differenceMinutes}M`;
  }
  if (time < Time.ONE_DAY) {
    const hour = Math.floor(time / Time.ONE_HOUR);
    const minute = Math.floor((time - hour * Time.ONE_HOUR) / Time.ONE_MINUTE);
    return `${hour}H ${minute}M`;
  }
  if (time > Time.ONE_DAY) {
    const day = Math.floor(time / Time.ONE_DAY);
    const hour = Math.floor((time - day * Time.ONE_DAY) / Time.ONE_HOUR);
    const minute = Math.floor((time - day * Time.ONE_DAY - hour * Time.ONE_HOUR) / Time.ONE_MINUTE);
    return `${day}D ${hour}H ${minute}M`;
  }
};

export const getSortedArrayLabelsWithData = (arrayLabels, arrayData) => {
  const labelsWithData = arrayLabels.map((element, i) => ({
    label: element,
    data: arrayData[i],
  }));
  const sortedLabelsWithData = labelsWithData.sort((labelWithDataA, labelWithDataB) => labelWithDataB.data - labelWithDataA.data);
  return sortedLabelsWithData;
};


