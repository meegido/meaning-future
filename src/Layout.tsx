import { Header } from './shared/components/header.tsx';
import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);
