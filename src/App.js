import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { history } from '@/store';
import { ConnectedRouter } from 'connected-react-router';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

import AppLayout from '@/layouts';
import PageLoading from '@/components/Page-Loading';

// multi language
// import '@/locales'

// load app SCSS styles
import '@/styles/App.scss';

// load Toast styles
import 'react-toastify/dist/ReactToastify.css';

// load app LESS styles
// import '@/styles/App.less';

const ReactApp = () => {
  return (
    <Router>
      <Helmet titleTemplate="%s - aldenn - Admin" defaultTitle="aldenn - Admin">
        <meta name="description" content="Admin site of Alden Blog" />
      </Helmet>

      <ConnectedRouter history={history}>
        <Suspense fallback={<PageLoading show />}>
          <AppLayout />
          <PageLoading />
        </Suspense>
      </ConnectedRouter>

      <ToastContainer />
    </Router>
  );
};

export default ReactApp;
