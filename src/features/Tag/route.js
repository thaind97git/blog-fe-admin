import { lazy } from 'react';

const Tags = lazy(() => import('./index'));

export default [
  {
    name: 'tags',
    path: '/tags',
    exact: true,
    component: Tags,
  },
];
