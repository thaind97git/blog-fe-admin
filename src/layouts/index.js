import React, { useState } from 'react';
import { Layout } from 'antd';

import { getDisplayLayout } from '@/store/selectors/layout';

import { useShallowEqualSelector } from '@/hooks/useShallowEqualSelector';
import AppHeader from './Header';
import Footer from './Footer';
import Main from './Main';
import NavLeft from './Nav-Left';
import Auth from './Auth';

import { NAV_LEFT_W, NAV_LEFT_W_COLLAPSED } from './constants';

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState();

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
          display={layout.navLeft}
        />
        <Layout
          className="site-layout"
          style={{
            marginLeft: marginLeftMainLayout,
          }}
        >
          <AppHeader display={layout.header} collapsed={collapsed} />
          <Auth>
            <Main />
          </Auth>
          <Footer display={layout.footer} collapsed={collapsed} />
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
