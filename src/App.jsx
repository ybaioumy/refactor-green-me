import React from 'react';
import Login from './routes/Login';
import ErrorPage from './routes/ErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './routes/Register';

function App() {
  const baseUrl = process.env.REACT_APP_API_BASE;
  if (!baseUrl) {
    throw new Error('Missing REACT_APP_API_BASE environment variable');
  } else {
    console.log(`API base URL: ${baseUrl}`);
  }
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
  return <RouterProvider router={AuthRouter} />;
}

export default App;
