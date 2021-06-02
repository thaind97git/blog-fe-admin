import { lazy } from 'react';

const Socials = lazy(() => import('./index'));

export default [
  {
    name: 'socials',
    path: '/socials',
    exact: true,
    component: Socials,
  },
];
