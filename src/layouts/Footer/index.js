import { Layout } from 'antd';
import React from 'react';
const { Footer } = Layout;
const AppFooter = ({ display = false }) => {
  if (!display) {
    return null;
  }
  return (
    <Footer style={{ textAlign: 'center' }}>
      Ant design ©{new Date().getFullYear()} Created by thaind97git
    </Footer>
  );
};

export default AppFooter;
