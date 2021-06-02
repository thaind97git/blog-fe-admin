import { lazy } from 'react';

const Posts = lazy(() => import('./index'));
const EditPost = lazy(() => import('./components/Edit'));
const CreatePost = lazy(() => import('./components/Create'));

export default [
  {
    name: 'posts-management',
    path: '/posts/manage',
    exact: true,
    component: Posts,
  },
  {
    name: 'posts-edit',
    path: '/posts/details',
    exact: true,
    component: EditPost,
  },
  {
    name: 'posts-create',
    path: '/posts/create',
    exact: true,
    component: CreatePost,
  },
];
