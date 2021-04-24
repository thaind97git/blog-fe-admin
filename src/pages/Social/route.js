import { lazy } from 'react';
import withAuth from '@/components/HOC/withAuth';

const Socials = lazy(() => import('./index'));

export default [
  {
    name: 'socials',
    path: '/socials',
    exact: true,
    component: withAuth(Socials),
  },
];
