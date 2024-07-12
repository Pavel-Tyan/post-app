import React from 'react';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './layout/Auth/AuthLayout.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import RequireAuth from './helpers/RequireAuth.tsx';
import ReactDOM from 'react-dom/client';
import Register from './pages/Register/Register.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login/Login.tsx';
import Layout from './layout/Menu/Layout.tsx';
import PasswordSettings from './pages/PasswordSettings/PasswordSettings.tsx';
import PersonalDataSettings from './pages/PersonalDataSettings/PersonalDataSettings.tsx';
import Publications from './pages/Publications/Publications.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <RequireAuth>
                <Layout>
                    <Publications />
                </Layout>
            </RequireAuth>
        ),
    },
    {
        path: '/login',
        element: (
            <AuthLayout>
                <Login />
            </AuthLayout>
        ),
    },
    {
        path: '/register',
        element: (
            <AuthLayout>
                <Register />
            </AuthLayout>
        ),
    },
    {
        path: '/personalData',
        element: (
            <RequireAuth>
                <Layout>
                    <PersonalDataSettings />
                </Layout>
            </RequireAuth>
        ),
    },
    {
        path: '/password',
        element: (
            <RequireAuth>
                <Layout>
                    <PasswordSettings />
                </Layout>
            </RequireAuth>
        ),
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
