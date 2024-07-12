import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar/Navbar';

export default function Layout({ children }: any) {

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}




