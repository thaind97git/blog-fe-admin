import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

import { formatDate, isValidDateFormat, DATE_FORMAT } from '@/utils';

const { RangePicker } = DatePicker;
const dateFormat = DATE_FORMAT;
const defaultQuickRanges = {
  'Tuần này': [moment().startOf('week'), moment().endOf('week')],
  'Tuần trước': [
    moment().subtract(1, 'weeks').startOf('week'),
    moment().subtract(1, 'weeks').endOf('week'),
  ],
  'Tháng này': [moment().startOf('month'), moment().endOf('month')],
  'Tháng trước': [
    moment().subtract(1, 'months').startOf('month'),
    moment().subtract(1, 'months').endOf('month'),
  ],
};
function DateRangePicker({
  setDateRange,
  ranges = defaultQuickRanges,
  defaultValue,
  ...others
}) {
  const [selectedDate, setSelectedDate] = React.useState([
    defaultValue?.[0],
    defaultValue?.[1],
  ]);

  const handleDateChange = (date = []) => {
    setSelectedDate(date);
    if (!date) {
      return;
    }

    const isAllOfTruthy = !!date[0] && !!date[1];
    const isAllOfFalsy = !date[0] && !date[1];

    if (!isAllOfFalsy && !isAllOfTruthy) {
      return;
    }
    let fromDate, toDate;

    if (isAllOfFalsy) {
      setDateRange({ fromDate, toDate });
      return;
    }

    if (isAllOfTruthy) {
      fromDate = formatDate(date[0], dateFormat);
      toDate = formatDate(date[1], dateFormat);
    }
    isValidDateFormat(fromDate, dateFormat) &&
      isValidDateFormat(toDate, dateFormat) &&
      setDateRange({ fromDate, toDate });
  };
  return (
    <>
      <RangePicker
        ranges={ranges}
        size="large"
        onChange={date => {
          handleDateChange(date || []);
        }}
        format={dateFormat}
        value={selectedDate}
        {...others}
      />
    </>
  );
}

export default DateRangePicker;
