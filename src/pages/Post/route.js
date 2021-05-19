import { lazy } from 'react';
import withAuth from '@/components/HOC/withAuth';

const Posts = lazy(() => import('./index'));
const EditPost = lazy(() => import('./components/Edit'));
const CreatePost = lazy(() => import('./components/Create'));

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
  {
    name: 'posts-create',
    path: '/posts/create',
    exact: true,
    component: withAuth(CreatePost),
  },
];
