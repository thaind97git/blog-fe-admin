import React from 'react';
import { Layout } from 'antd';

import { NAV_LEFT_W, NAV_LEFT_W_COLLAPSED } from '../constants';

const { Header } = Layout;

const AppHeader = ({ display, collapsed }) => {
  if (!display) {
    return null;
  }
  return (
    <header className="header">
      <Header
        className="site-layout-background header__fixed"
        style={{
          padding: 0,
          width: `calc(100vw - ${
            collapsed ? NAV_LEFT_W_COLLAPSED : NAV_LEFT_W
          }px)`,
        }}
      />
    </header>
  );
};

export default AppHeader;
