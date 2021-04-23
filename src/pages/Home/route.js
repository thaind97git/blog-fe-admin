import { lazy } from 'react';
import withAuth from '@/components/HOC/withAuth';

const Home = lazy(() => import('./index'));

export default [
  {
    name: 'home',
    path: '/',
    exact: true,
    layout: {
      header: true,
      footer: true,
      navLeft: true,
    },
    component: withAuth(Home),
  },
];
