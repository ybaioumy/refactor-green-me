import React, { useState } from 'react';
// import '../styles/components/Layout/header.css';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/expert/components/SideBar';
export default function Layout() {
  return (
    <>
      <Header />
      <main className="greenMe-container h-full">{<Outlet />}</main>
    </>
  );
}

export const ExpertLayout = () => {
  const [isToggled, setIsToggled] = useState(false);

  const expertTabs = [
    {
      name: 'Expert Details',
      icon: 'details',
      link: `/profile`,
    },
    {
      name: 'Assigned Projects',
      icon: 'settings',
      link: `/`,
    },
    {
      name: 'Missions / Work',
      icon: 'progress',
      link: `/assigned-missions`,
    },
  ];

  return (
    <div className="relative">
      <Header />
      <Sidebar
        tabs={expertTabs}
        isToggled={isToggled}
        setIsToggled={setIsToggled}
      />

      <main className="greenMe-container h-full">{<Outlet />}</main>
    </div>
  );
};
