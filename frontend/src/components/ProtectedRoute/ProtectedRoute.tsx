import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { ReactNode } from "react";
import { useEffect } from "react";

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { loading, isAuthenticated, isVerified } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                navigate('/login', { replace: true });
            } else if (!isVerified) {
                navigate('/email-verify', { replace: true });
            }
        }
    }, [loading, isAuthenticated, isVerified, navigate]);

    if (loading || !isAuthenticated || !isVerified) {
        return (
            <h1>Loading...</h1>
        );
    }

    return children;
};

export default ProtectedRoute;