import React, { useState, useCallback } from 'react';
import { Divider, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';

const emptyFunction = () => {};

function SearchHeader({
  placeholder = '',
  searchMessage,
  setSearchMessage = emptyFunction,
}) {
  const [value, setValue] = useState(searchMessage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceLoadData = useCallback(debounce(setSearchMessage, 1000), []);

  function handleSearchChange(event) {
    const { value } = event.target;

    setValue(value);
    debounceLoadData(value);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Divider type="vertical" />
      <Input
        value={value}
        placeholder={placeholder}
        onChange={handleSearchChange}
        bordered={false}
        suffix={<SearchOutlined />}
      />
    </div>
  );
}
export default SearchHeader;
