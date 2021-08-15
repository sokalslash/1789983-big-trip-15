import dayjs from 'dayjs';

export const humanizeDateForPoint = (someDate) => dayjs(someDate).format('MM/DD/YY HH:mm');

export const humanizeDateForEventAndInfo = (someDate) => dayjs(someDate).format('D MMM');

export const humanizeTimeForEvent = (someDate) => dayjs(someDate).format('H:mm');

export const humanizeDateForAttributeEvent = (someDate) => dayjs(someDate).format();

export const isPast = (date) => dayjs().isAfter(dayjs(date), 'D');

export const isFutures = (date) => dayjs().isBefore(dayjs(date), 'D');
