import { lazy } from 'react';

const AppRoutes = [
  {
    path: '/',
    component: lazy(() => import('~/pages/Home')),
    exact: true
  },
  {
    path: '/about',
    component: lazy(() => import('~/pages/About')),
    exact: true
  }
];

export { AppRoutes };
