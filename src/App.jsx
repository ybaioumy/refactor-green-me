import React, { useEffect, useState, useCallback } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  useGetToken,
  useTypeId,
  useTokenExpiration,
  useLogout,
} from './hooks/useCookies';
import { useNavigate } from 'react-router-dom';
import Login from './routes/Login';
import ErrorPage from './routes/ErrorPage';
import Layout from './routes/Layout';
import ProjectListing from './components/shared/ProjectListing';
import Dashboard from './components/client/Dashboard';
import Profile from './routes/Profile';
import Register from './routes/Register';
import Project from './components/client/Project';
import NewProject from './routes/NewProject';
import EligibilityTest from './routes/EligibilityTest';
import ProposalsPage from './routes/Proposals';
import { OnlineStatusProvider } from './context/onlineConnectionContext';
import ConnectionStatusNotification from './components/shared/ConnectionNotification';
import SubmitOffer from './routes/SubmitOffer';
import OpportunitiyOverview from './components/ESCO/OpportunitiyOverview';
import MembersListing from './components/ESCO/MembersListing';
import MissionsListing from './components/ESCO/MissionsListing';
import AssignMission from './components/ESCO/AssignMission';
import ESCODashboard from './components/ESCO/Dashboard';
import ProjectESCO from './components/ESCO/Project';
import Mission from './components/ESCO/Mission';
import ProjectInvitation from './routes/JoinProject';
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = useGetToken();
  const expiry = useTokenExpiration();
  const logout = useLogout();

  const expirationTime = new Date(expiry).getTime() - 60000;

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  useEffect(() => {
    if (!token) {
      handleLogout();
      console.log('No token available');
    } else if (Date.now() >= expirationTime) {
      handleLogout();
      console.log('Token expired');
    }
  }, [token, expirationTime, handleLogout]);

  return token ? children : null;
};

const clientRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'projects',
        children: [
          {
            index: true,
            element: <ProjectListing />,
          },
          {
            path: 'eligible/:id',
            element: <Project />,
          },
        ],
      },
      {
        path: 'new-project',
        children: [
          {
            index: true,
            element: <NewProject />,
          },
          {
            path: ':id',
            element: <EligibilityTest />,
          },
        ],
      },
      {
        path: 'proposals/:id',
        element: <ProposalsPage />,
      },
      {
        path: 'esco/:id',
        element: <Profile />,
      },
      {
        path: 'profile/',
        element: <Profile />,
      },
    ],
  },
]);

const ESCORouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ESCODashboard />,
      },
      {
        path: 'submit-offer/:id',
        element: <SubmitOffer />,
      },
      {
        path: 'projects',

        children: [
          {
            index: true,
            element: <ProjectListing />,
          },

          {
            path: 'opportunities',
            element: <ProjectListing />,
          },
          {
            path: 'opportunities/project-details/:id',
            element: <OpportunitiyOverview />,
          },
          {
            path: 'eligible/:id',
            element: <ProjectESCO />,
          },
          {
            path: 'eligible/:id/add-members',
            element: <MembersListing />,
          },
          {
            path: 'eligible/:id/add-mission',
            element: <MissionsListing />,
          },
          {
            path: 'eligible/:id/mission/:id',
            element: <Mission />,
          },
        ],
      },
      {
        path: 'new-project',
        children: [
          {
            index: true,
            element: <NewProject />,
          },
          {
            path: ':id',
            element: <EligibilityTest />,
          },
        ],
      },
      {
        path: 'create-mission',
        element: <AssignMission />,
      },

      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'join-project',
        element: <ProjectInvitation />,
      },
    ],
  },
]);

const expertRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <div>Expert Dashboard</div>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

const AuthRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const typeId = useTypeId();
  const token = useGetToken();
  const getUserType = (typeId) => {
    const userTypeMap = {
      1: 'client',
      2: 'esco',
      3: 'expert',
    };
    return userTypeMap[Number(typeId)];
  };
  const userType = getUserType(typeId);

  const handleRouter = (userType) => {
    if (!userType || !token) {
      return AuthRouter;
    }
    switch (userType) {
      case 'client':
        return clientRouter;
      case 'esco':
        return ESCORouter;
      case 'expert':
        return expertRouter;
      default:
        return AuthRouter;
    }
  };
  return (
    <OnlineStatusProvider provider>
      <ConnectionStatusNotification />
      <RouterProvider router={handleRouter(userType)} />
    </OnlineStatusProvider>
  );
}

export default App;
