import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
        return <Navigate to='/login' replace />;
    }

    return children;
};

export default RequireAuth;
