import { Fragment, useMemo, useState } from 'react';
import {
  Disclosure,
  Menu,
  Transition,
  DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import Icon from '../shared/Icon';
import { useTypeId, useGetUserName, useLogout } from '../../hooks/useCookies';
import LogoPrimary from '../../assets/images/GreenMeTitle.png';
import LogoSec from '../../assets/images/greenMe_Green.png';
import User from '../../assets/images/m.png';
import HeadrBg from '../../assets/images/headerBackground.jpeg';
import '../../styles/header.css';
export default function Header() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const userType = useTypeId();
  const userName = useGetUserName();
  function getFirstName(fullName) {
    if (!fullName) return userTypeMap[userType]; // Handle cases where fullName is empty or undefined
    return fullName.split(' ')[0];
  }
  const userTypeMap = {
    1: 'client',
    2: 'esco',
    3: 'expert',
  };
  const navLinks = {
    common: {
      dashboard: '/',
      projects: '/projects',
    },
    esco: {
      projects: '/projects',
      OandM: '/O&M',
    },
    client: {
      projects: '/projects',
      newProject: '/new-project',
      OandM: '/O&M',
    },
    expert: {},
  };

  const getNavLinks = (role) => {
    switch (role) {
      case 'client':
        return { ...navLinks.common, ...navLinks.client };
      case 'esco':
        return { ...navLinks.common, ...navLinks.esco };
      case 'expert':
        return { ...navLinks.expert };
      default:
        return navLinks.common;
    }
  };

  const linksToShow = getNavLinks(userTypeMap[userType]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const navigate = useNavigate();
  const logout = useLogout();
  const isProfile = useLocation().pathname === '/profile';
  const headerImage = useMemo(() => {
    if (isProfile) {
      return LogoSec;
    } else {
      return LogoPrimary;
    }
  }, [isProfile]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
 const handleImageLoad = () => {
   setIsImageLoaded(true);
 };
  return (
    <header>
      <div
        className={`${
          isProfile
            ? 'bg-[#E0E0E0] flex items-center justify-center min-h-[60px] max-h-[60px]  gap-2'
            : ' bgGreenMe'
        }`}>
        <div
          className={`flex items-center justify-center h-full ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500`}>
          <Link to="/">
            <img
              src={headerImage}
              alt="Green Me"
              className="w-44 h-[30px] object-contain"
              onLoad={handleImageLoad}
            />
          </Link>
          {isProfile && (
            <p className="text-[#1E4A28] font-light text-[32px]">ESCO</p>
          )}
        </div>
        {isProfile && (
          <p className="text-[#1E4A28] font-light text-[32px]">ESCO</p>
        )}
      </div>
      <Disclosure
        as="nav"
        className="bg-[linear-gradient(0deg,_#C6C8C6_-106.07%,_#000_147.07%)] py-2 "
        aria-label="Main navigation">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-lx px-2 sm:px-6 lg:px-8">
              <div className="relative h-10 flex sm:h-fit items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-label={open ? 'Close main menu' : 'Open main menu'}>
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Toggle menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-end sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 text-white">
                      {Object.entries(linksToShow).map(([name, href]) => (
                        <NavLink
                          key={name}
                          to={href}
                          className="flex flex-col items-center hover:text-gray-300 capitalize"
                          aria-current={
                            window.location.pathname === href
                              ? 'page'
                              : undefined
                          }>
                          <Icon name={name} />
                          {name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
                  {userTypeMap[userType] === 'esco' && (
                    <Link
                      to="/profile"
                      className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      aria-label="Profile">
                      <span className="absolute -inset-1.5" />
                      <Icon name="brief-case" />
                    </Link>
                  )}
                  <button
                    type="button"
                    className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-label="Notifications">
                    <span className="absolute -inset-1.5" />
                    <Icon name="notification" />
                  </button>
                  <button
                    type="button"
                    className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-label="Chat">
                    <span className="absolute -inset-1.5" />
                    <Icon name="chat" />
                  </button>
                  <button
                    type="button"
                    className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-label="Menu">
                    <span className="absolute -inset-1.5" />
                    <Icon name="menu" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        className="relative flex rounded-full text-sm focus:outline-none "
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : 'false'}>
                        <span className="absolute -inset-1.5" />
                        <div className="flex gap-2 items-center">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={User}
                            alt="User name"
                          />
                          <div className="text-left truncate md:max-w-[150px]">
                            <span className="font-abel block font-normal text-white">
                              Welcome,{' '}
                            </span>
                            <span className="font-semibold text-[18px] md:text-[24px] text-white capitalize max-w-[200px] md:max-w-[300px] text-ellipsis">
                              {getFirstName(userName)}!
                            </span>
                          </div>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}>
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                              )}>
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Transition
              enter="duration-200 ease-out"
              enterFrom="opacity-0 -translate-y-6"
              enterTo="opacity-100 translate-y-0"
              leave="duration-300 ease-out"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-6">
              <DisclosurePanel className="origin-top transition">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {Object.entries(linksToShow).map(([name, href]) => (
                    <NavLink
                      key={name}
                      to={href}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium capitalize'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium capitalize'
                      }>
                      {name}
                    </NavLink>
                  ))}
                </div>
              </DisclosurePanel>
            </Transition>
          </>
        )}
      </Disclosure>
    </header>
  );
}
