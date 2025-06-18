import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { ReactNode } from "react";
import { useEffect } from "react";

type ProtectedRouteAuthOnlyProps = {
    children: ReactNode;
};

const ProtectedRouteAuthOnly: React.FC<ProtectedRouteAuthOnlyProps> = ({ children }) => {
    const { loading, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [loading, isAuthenticated, navigate]);

    if (loading || !isAuthenticated) {
        return (
            <h1>Loading...</h1>
        );
    }

    return children;
};

export default ProtectedRouteAuthOnly;