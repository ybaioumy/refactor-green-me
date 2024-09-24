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
import ProjectOverView from './components/client/ProjectOverView';
import SubmitOffer from './routes/SubmitOffer';
import OpportunitiyOverview from './components/esco/OpportunitiyOverview';
import MembersListing from './components/esco/MembersListing';
import MissionsListing from './components/esco/MissionsListing';
import AssignMission from './components/esco/AssignMission';
import ESCODashboard from './components/esco/Dashboard';
import ProjectESCO from './components/esco/Project';
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = useGetToken();
  const expiry = useTokenExpiration();
  const logout = useLogout();

  const expirationTime = new Date(expiry).getTime() - 60000; // A minute early to avoid latency issues

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

// Define the client router
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
        index: true, // Default route for "/"
        element: <ESCODashboard />,
      },
      {
        path: 'submit-offer/:id', // Updated to hyphen-case
        element: <SubmitOffer />,
      },
      {
        path: 'projects', // Grouping project-related routes

        children: [
          {
            index: true,
            element: <ProjectListing />,
          },

          {
            path: 'opportunities', // Relative path for "/projects/opportunities"
            element: <ProjectListing />,
          },
          {
            path: 'opportunities/project-details/:id', // "/projects/opportunities/project-details/:id"
            element: <OpportunitiyOverview />,
          },
          {
            path: 'eligible/:id', // "/projects/eligible/:id"
            element: <ProjectESCO />,
          },
          {
            path: 'eligible/:id/add-members', // "/projects/eligible/:id/add-members"
            element: <MembersListing />,
          },
          {
            path: 'eligible/:id/add-mission', // "/projects/eligible/:id/add-mission"
            element: <MissionsListing />,
          },
        ],
      },
      {
        path: 'new-project', // Hyphen-case for consistency
        children: [
          {
            index: true, // "/new-project"
            element: <NewProject />,
          },
          {
            path: ':id', // "/new-project/:id"
            element: <EligibilityTest />,
          },
        ],
      },
      {
        path: 'create-mission', // "/create-mission
        element: <AssignMission />,
      },

      {
        path: 'profile',
        element: <Profile />,
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
  // Handle the routing based on user type
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
  // Use the appropriate router based on the user type
}

export default App;
