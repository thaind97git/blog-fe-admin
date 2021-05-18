import { lazy } from 'react';
import withAuth from '@/components/HOC/withAuth';

const Posts = lazy(() => import('./index'));
const EditPost = lazy(() => import('./components/Edit'));

export default [
  {
    name: 'posts-management',
    path: '/posts/manage',
    exact: true,
    component: withAuth(Posts),
  },
  {
    name: 'posts-edit',
    path: '/posts/details',
    exact: true,
    component: withAuth(EditPost),
  },
];
