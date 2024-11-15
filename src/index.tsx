import { StrictMode } from 'react';
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
import React from 'react';
import { Header } from './shared/components/header';
import { Feed } from './feed/feed';
import { UserFeed } from './user-feed/user-feed';
import { LinkDetail } from './link/link-detail';

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
    element: <Feed />,
  },
  {
    path: '/:user',
    element: <UserFeed />,
  },
  {
    path: 'link/:id',
    element: <LinkDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
  </StrictMode>
);
