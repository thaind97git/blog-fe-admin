import { Divider, Typography } from 'antd';
import React from 'react';
const { Title } = Typography;
const MainTitle = ({ title, actions }) => {
  if (!title) {
    return null;
  }
  return (
    <div className="main-title">
      <div className="main-title--wrapper">
        <Title
          style={{ fontWeight: 500, marginBottom: 0 }}
          className="main-title--title"
          level={4}
        >
          {title}
        </Title>
        {actions && <div className="main-title--actions">{actions}</div>}
      </div>
      <Divider />
    </div>
  );
};

export default MainTitle;
