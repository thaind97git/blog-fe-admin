import React, { useState } from 'react';
import { Layout } from 'antd';

import { getDisplayLayout } from '@/store/selectors/layout';
import { getIsAuthenticated } from '@/store/selectors/auth';

import { useShallowEqualSelector } from '@/hooks/useShallowEqualSelector';
import AppHeader from './Header';
import Footer from './Footer';
import Main from './Main';
import NavLeft from './Nav-Left';

import { NAV_LEFT_W, NAV_LEFT_W_COLLAPSED } from './constants';

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState();

  const isAuthenticated = useShallowEqualSelector(getIsAuthenticated);
  const layout = useShallowEqualSelector(getDisplayLayout);

  let marginLeftMainLayout = 0;
  if (layout.navLeft) {
    if (collapsed) {
      marginLeftMainLayout = NAV_LEFT_W_COLLAPSED;
    } else {
      marginLeftMainLayout = NAV_LEFT_W;
    }
  }

  return (
    <div id="layout">
      <Layout>
        <NavLeft
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          display={isAuthenticated && layout.navLeft}
        />
        <Layout
          className="site-layout"
          style={{
            marginLeft: marginLeftMainLayout,
          }}
        >
          <AppHeader
            display={isAuthenticated && layout.header}
            collapsed={collapsed}
          />
          <Main isAuthenticated={isAuthenticated} />
          <Footer
            display={isAuthenticated && layout.footer}
            collapsed={collapsed}
          />
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
