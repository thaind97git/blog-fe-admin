import React from 'react';
import { Layout } from 'antd';

import { FOOTER_H, NAV_LEFT_W, NAV_LEFT_W_COLLAPSED } from '../constants';

const { Footer } = Layout;
const AppFooter = ({ display = false, collapsed }) => {
  if (!display) {
    return null;
  }
  return (
    <Footer
      id="footer"
      style={{
        textAlign: 'center',
        position: 'fixed',
        left: collapsed ? NAV_LEFT_W_COLLAPSED : NAV_LEFT_W,
        right: 0,
        bottom: 0,
        transition: 'left 0.2s',
        height: FOOTER_H,
      }}
    >
      Ant design ©{new Date().getFullYear()} Created by thaind97git
    </Footer>
  );
};

export default AppFooter;
