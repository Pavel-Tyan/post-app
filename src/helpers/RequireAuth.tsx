import { Navigate } from 'react-router-dom';

/**
 * Function that checks for authentication and redirects to login page if not authenticated.
 *
 * @param {React.ReactNode} children - The child components to render if authenticated
 * @return {React.ReactNode} The child components or a redirect to login page
 */
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
        return <Navigate to='/login' replace />;
    }

    return children;
};

export default RequireAuth;
