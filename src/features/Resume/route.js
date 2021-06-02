import { lazy } from 'react';

const Resumes = lazy(() => import('./index'));

export default [
  {
    name: 'resumes',
    path: '/resumes',
    exact: true,
    component: Resumes,
  },
];
