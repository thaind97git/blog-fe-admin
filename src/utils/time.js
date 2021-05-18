import moment from 'moment';

const DATE_FORMAT = 'MM/DD/YYYY';

const TIME_FORMAT = 'hh:mm:ss A';

const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

const formatDate = (time, format = DATE_FORMAT) =>
  time ? moment(time).format(format) : null;

const isValidDateFormat = (value, format = DATE_FORMAT) =>
  value ? moment(value, format, true).isValid() : false;

const displayTime = (time, format = DATE_TIME_FORMAT) =>
  time ? moment(time).format(format) : null;

export default {
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT,
  formatDate,
  isValidDateFormat,
  displayTime,
};
