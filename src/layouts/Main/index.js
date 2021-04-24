import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import routes from '@/router';
import { useShallowEqualSelector } from '@/hooks/useShallowEqualSelector';
import { getDisplayLayout } from '@/store/selectors/layout';
import { setDisplayLayout } from '@/store/actions/layout';
import { compareTwoObject } from '@/utils';
import { FOOTER_H, HEADER_H } from '../constants';

const Main = ({ isAuthenticated }) => {
  const layout = useShallowEqualSelector(getDisplayLayout);
  const dispatch = useDispatch();

  const updateDisplayLayout = (currentLayout, layout) => {
    const layoutUpdated = currentLayout
      ? {
        header: !!currentLayout.header,
        footer: !!currentLayout.footer,
        navLeft: !!currentLayout.navLeft,
      }
      : { header: true, footer: true, navLeft: true };

    if (!compareTwoObject(layoutUpdated, layout)) {
      setTimeout(() => dispatch(setDisplayLayout(layoutUpdated)));
    }
  };

  return (
    <div
      id="main"
      style={{
        marginTop: isAuthenticated && layout.header && HEADER_H + 24,
        marginBottom: isAuthenticated && layout.footer && FOOTER_H + 24,
        marginLeft: isAuthenticated && 24,
        marginRight: isAuthenticated && 24,
        padding: isAuthenticated && 24,
      }}
    >
      <Switch>
        {routes.map(
          ({ component: Component, path, layout: currentLayout, ...rest }) => {
            return (
              <Route
                key={path}
                path={path}
                render={props => {
                  updateDisplayLayout(currentLayout, layout);
                  return <Component {...props} />;
                }}
                {...rest}
              />
            );
          },
        )}
      </Switch>
    </div>
  );
};

export default Main;
