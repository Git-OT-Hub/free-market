import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { ReactNode } from "react";
import { useEffect } from "react";

type ProtectedRouteNoAuthProps = {
    children: ReactNode;
};

const ProtectedRouteNoAuth: React.FC<ProtectedRouteNoAuthProps> = ({ children }) => {
    const { loading, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate('/', { state: {type: 'failure', text: '先にログアウトしてください。'}, replace: true });
        }
    }, [loading, isAuthenticated, navigate]);

    if (loading || isAuthenticated) {
        return (
            <h1>Loading...</h1>
        );
    }

    return children;
};

export default ProtectedRouteNoAuth;