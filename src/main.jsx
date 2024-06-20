import React from 'react'
import SignUp from './home_materialui/SignUp';
import SignIn from './home_materialui/SignIn';
import HomeAdmin from './home_materialui/modules/components/admin/HomeAdmin';
import ProductosAdmin from './home_materialui/modules/components/admin/ProductosAdmin';
import Home from './home_materialui/Home';
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <h1>404</h1>,
  },
  {
    path: '/Home',
    element: <Home />,
    errorElement: <h1>404</h1>,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/home-admin',
    element: <HomeAdmin />,
  },
  {
    path: '/admin-productos',
    element: <ProductosAdmin />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

