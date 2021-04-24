import { Button, Empty } from 'antd';
import React from 'react';
import EmptyIcon from '_static/image/icon/empty.svg';

const EmptyRecord = ({ refreshAction, title = 'No record found' }) => {
  return (
    <Empty
      image={EmptyIcon}
      imageStyle={{
        height: 60,
      }}
      description={
        <span
          style={{
            fontSize: 18,
          }}
        >
          {title}
        </span>
      }
    >
      {refreshAction && (
        <Button
          onClick={() => {
            typeof refreshAction === 'function' && refreshAction();
          }}
          type="primary"
        >
          Refresh
        </Button>
      )}
    </Empty>
  );
};

export default EmptyRecord;
