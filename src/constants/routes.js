import { lazy } from 'react';
const TabsPageV1 = lazy(() => import('@/pages/Tabs/v1'));
const AnalogClockPage = lazy(() => import('@/pages/Clock'));

export const routes = [
  {
    name: 'Tabs',
    path: 'tabs',
    default: 'simple',
    versions: [
      {
        name: 'Simple',
        id: 'simple',
        component: TabsPageV1,
      },
    ],
  },
  {
    name: 'Analog clock',
    path: 'analog-clock',
    component: AnalogClockPage,
  },
];
