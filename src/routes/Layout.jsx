import React from 'react';
// import '../styles/components/Layout/header.css';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
export default function Layout() {
  return (
    <>
      <Header />
      <main className="greenMe-container h-full">{<Outlet />}</main>
    </>
  );
}
