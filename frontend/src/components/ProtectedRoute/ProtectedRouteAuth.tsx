import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { ReactNode } from "react";
import { useEffect } from "react";

type ProtectedRouteAuthProps = {
    children: ReactNode;
};

const ProtectedRouteAuth: React.FC<ProtectedRouteAuthProps> = ({ children }) => {
    const { loading, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login', { state: {type: 'failure', text: 'ログインが必要です'}, replace: true });
        }
    }, [loading, isAuthenticated, navigate]);

    if (loading || !isAuthenticated) {
        return (
            <h1>Loading...</h1>
        );
    }

    return children;
};

export default ProtectedRouteAuth;