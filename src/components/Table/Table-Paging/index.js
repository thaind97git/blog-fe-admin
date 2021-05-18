import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row, Table } from 'antd';
import { isMoment } from 'moment';
import { setLoading } from '@/store/actions';

import SearchHeader from '../components/Search-Header';
import DateRangePicker from '@/components/Date-Range-Picker';
import TablePagination from '../components/Pagination';

import { errorHandler } from '@/helpers/axios';
import { DATE_TIME_FORMAT, formatDate, functionCaller } from '@/utils';

const PAGE_SIZE_DEFAULT = 10,
  PAGE_DEFAULT = 1;

const TablePaging = ({
  data = [],
  columns = [],
  promiseFunc,
  totalCount,
  pageSize = PAGE_SIZE_DEFAULT,
  page = PAGE_DEFAULT,
  searchProps = {},
  dateRangeProps = {},
  hasAction = true,
  hasPaging = true,
  onGetPageIndex,
  onGetPageSize,
  onGetResponse,
  isSearch = true,
  isDateRange = true,
  ...others
}) => {
  const {
    searchMessage,
    setSearchMessage,
    placeholder = 'Tìm kiếm theo ...',
    exCondition = [],
    exElement,
    placeholderDateRange,
    otherDateRange = {},
  } = searchProps;

  const dispatch = useDispatch();

  const { dateRange, setDateRange } = dateRangeProps;
  const [pageSizeTable, setPageSizeTable] = useState(pageSize);
  const [pageIndex, setPageIndex] = useState(page);
  const otherCondition = exCondition.join('~');

  const fetchData = useCallback(
    async (promiseFunc, data) => {
      dispatch(setLoading(true));
      try {
        const resp = await functionCaller(promiseFunc, data);
        functionCaller(onGetResponse, resp?.data);
      } catch (error) {
        errorHandler(error);
      }

      dispatch(setLoading(false));
    },
    [onGetResponse, dispatch],
  );

  // Have paging and don't have action CASE
  useEffect(() => {
    if (hasPaging && !hasAction) {
      fetchData(promiseFunc, {
        pageIndex,
        pageSizeTable,
        conditions: { ...otherCondition.split('~') },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAction, hasPaging, otherCondition, pageIndex, pageSizeTable]);

  // Have paging and also action CASE
  useEffect(() => {
    if (hasAction && hasPaging) {
      if (isMoment(dateRange.fromDate)) {
        dateRange.fromDate = formatDate(dateRange.fromDate, DATE_TIME_FORMAT);
      }
      if (isMoment(dateRange.toDate)) {
        dateRange.toDate = formatDate(dateRange.toDate, DATE_TIME_FORMAT);
      }
      fetchData(promiseFunc, {
        pageIndex,
        pageSizeTable,
        searchMessage,
        dateRange,
        conditions: { ...otherCondition.split('~') },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pageSizeTable,
    pageIndex,
    dateRange,
    searchMessage,
    otherCondition,
    hasAction,
    hasPaging,
  ]);

  return (
    <div className="paging-table">
      {hasAction && (
        <Row className="paging-table--header" justify="space-between">
          <Col xs={24} sm={24} md={12} lg={18}>
            {(isDateRange || exElement) && (
              <Row gutter={[8, 8]} align="bottom" justify="start">
                {isDateRange && (
                  <Col>
                    <DateRangePicker
                      placeholder={placeholderDateRange}
                      small
                      setDateRange={setDateRange}
                      {...otherDateRange}
                    />
                  </Col>
                )}
                {exElement && <Col>{exElement}</Col>}
              </Row>
            )}
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            {isSearch && (
              <SearchHeader
                searchMessage={searchMessage}
                setSearchMessage={setSearchMessage}
                placeholder={placeholder}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            )}
          </Col>
        </Row>
      )}
      <Table
        style={{ overflow: 'auto' }}
        bordered
        pagination={false}
        dataSource={data}
        columns={columns}
        {...others}
      />
      {hasPaging && (
        <TablePagination
          defaultPageIndex={page}
          defaultPageSize={pageSize}
          totalCount={totalCount}
          onChange={(index, size) => {
            if (pageIndex !== index) {
              setPageIndex(index);
              functionCaller(onGetPageIndex, index);
            }

            if (pageSizeTable !== size) {
              setPageSizeTable(size);
              functionCaller(onGetPageSize, size);
            }
          }}
        />
      )}
    </div>
  );
};

export default TablePaging;
