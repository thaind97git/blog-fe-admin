import { lazy } from 'react';
import withAuth from '@/components/HOC/withAuth';

const Resumes = lazy(() => import('./index'));

export default [
  {
    name: 'resumes',
    path: '/resumes',
    exact: true,
    component: withAuth(Resumes),
  },
];
