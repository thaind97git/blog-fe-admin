import { lazy } from 'react';

const Posts = lazy(() => import('./index'));

export default [
  {
    name: 'posts',
    path: '/posts',
    exact: true,
    component: Posts,
  },
];
