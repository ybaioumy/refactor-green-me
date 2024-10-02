import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../shared/Icon';
const Sidebar = ({ tabs, isToggled, setIsToggled }) => {
  const headerHeight = useMemo(() => {
    const header = document.getElementsByTagName('header')[0];
    return header ? header.clientHeight : 135;
  }, []);

  const sidebarHeight = `calc(100vh - ${headerHeight}px)`;
  const { pathname } = useLocation();
  if (!tabs || tabs === null) return null;

  return (
    <div
      className={`${
        isToggled ? 'bg-[#343434]' : 'bg-black'
      } fixed top-0 bottom-0 z-50 rounded-tr-md rounded-br-md side-bar transition-all duration-300 ${
        isToggled ? 'w-60' : 'w-3'
      }`}>
      <div
        className={`transition-width duration-300 ease-in-out flex flex-col gap-8 p-2 py-6 overflow-hidden`}>
        {isToggled && tabs
          ? tabs.map((x, i) => (
              <Link
                key={i}
                to={x.link}
                className={`${
                  pathname.includes(x.link)
                    ? 'button-primary-green'
                    : 'bg-[#545454]  hover:bg-[#5454542d] '
                } rounded-full px-3 text-[#FFF] font-semibold text-[14px] flex ${
                  isToggled ? 'justify-between' : 'justify-center'
                } items-center py-1 transition duration-300`}>
                {isToggled && (
                  <span
                    className={`transition-opacity duration-300 truncate ${
                      isToggled ? 'opacity-100' : 'opacity-0'
                    }`}>
                    {x.name}
                  </span>
                )}
                <div className="p-1" title={x.name}>
                  <Icon name={x.icon} />
                </div>
              </Link>
            ))
          : null}
      </div>
      <button
        className={`side-bar-button ${isToggled ? 'open' : 'closed'}`}
        onClick={() => setIsToggled(!isToggled)}></button>
    </div>
  );
};

export default Sidebar;
