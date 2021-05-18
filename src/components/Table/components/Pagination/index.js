import { Pagination } from 'antd';
import React, { useState } from 'react';
import { functionCaller } from '@/utils';

function itemRenderDefaultCustom(current, type, originalElement) {
  if (type === 'prev') {
    return <a>Trang trước</a>;
  }
  if (type === 'next') {
    return <a>Trang tiếp</a>;
  }
  return originalElement;
}

const TablePagination = ({
  totalCount,
  itemRender = itemRenderDefaultCustom,
  onChange,
  showSizeChanger = true,
  defaultPageIndex = 0,
  defaultPageSize = 10,
}) => {
  const [pageIndex, setPageIndex] = useState(defaultPageIndex);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  return (
    <div className="table-pagination">
      <Pagination
        showSizeChanger={showSizeChanger}
        current={pageIndex}
        onShowSizeChange={(current, pageSize) => {
          setPageSize(pageSize);
          functionCaller(onChange, pageIndex, pageSize);
        }}
        onChange={pageIndex => {
          setPageIndex(pageIndex);
          functionCaller(onChange, pageIndex, pageSize);
        }}
        style={{ marginTop: 24 }}
        total={totalCount}
        itemRender={itemRender}
      />
    </div>
  );
};

export default TablePagination;
