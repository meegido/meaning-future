import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  RouterProvider,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import './global.css';
import * as Sentry from '@sentry/react';
import { UserFeed } from './user-feed/user-feed';
import { LinkDetail } from './link/link-detail';
import { Layout } from './Layout.tsx';
import { HomeFeed } from './home-feed/home-feed.tsx';
import { About } from './about/about.tsx';

if (import.meta.env.MODE !== 'development') {
  Sentry.init({
    dsn: 'https://6dc13e3a21259cffcea6d636e268ff97@o4507889958125568.ingest.de.sentry.io/4507889971691600',
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],
    tracesSampleRate: 1.0,
  });
}

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter);

const router = sentryCreateBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/',
        element: <HomeFeed />,
      },
      {
        path: '/:user',
        element: <UserFeed />,
      },
      {
        path: '/link/:id',
        element: <LinkDetail />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
