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
                navigate('/login', { state: {type: 'failure', text: 'ログインが必要です'}, replace: true });
            } else if (!isVerified) {
                navigate('/email-verify', { state: {type: 'failure', text: 'メール認証を完了してください。'}, replace: true });
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