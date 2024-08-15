import React from 'react';
import { createRoot } from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router.jsx'
import { Toaster } from 'react-hot-toast';
import AuthProvider from './provider/AuthProvider';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    <Toaster />
  </React.StrictMode>,
)
