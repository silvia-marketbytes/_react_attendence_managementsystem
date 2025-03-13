import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom'; 

const Index = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default layout;
