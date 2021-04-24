import { lazy } from 'react';
import withAuth from '@/components/HOC/withAuth';

const Profile = lazy(() => import('./index'));

export default [
  {
    name: 'profile',
    path: '/profile',
    exact: true,
    component: withAuth(Profile),
  },
];
