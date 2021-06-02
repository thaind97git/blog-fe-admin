import { lazy } from 'react';

const Profile = lazy(() => import('./index'));

export default [
  {
    name: 'profile',
    path: '/profile',
    exact: true,
    component: Profile,
  },
];
