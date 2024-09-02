import React from "react";
import { Header } from './home/components/header';
import { Home } from './home/page';

// header, footer and main
export const App: React.FC = () => {  
  return (
    <>
      <Header />
      <Home />
    </>
  )
}
