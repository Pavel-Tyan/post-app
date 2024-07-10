import React from 'react';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './layout/Auth/AuthLayout.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import Layout from './layout/Menu/Layout.tsx';
import RequireAuth from './helpers/RequireAuth.tsx';
import ReactDOM from 'react-dom/client';
import Register from './pages/Register/Register.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <RequireAuth>
                <Layout />
            </RequireAuth>
        ),
        children: [
            {
                path: 'posts',
                element: <></>,
            },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <></>,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
    {
        path: '/settings',
        element: <AuthLayout />,
        children: [
            {
                path: 'personalData',
                element: <></>,
            },
            {
                path: 'password',
                element: <></>,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);
