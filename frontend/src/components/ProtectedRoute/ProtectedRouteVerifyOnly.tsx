import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { ReactNode } from "react";
import { useEffect } from "react";

type ProtectedRouteVerifyOnlyProps = {
    children: ReactNode;
};

const ProtectedRouteVerifyOnly: React.FC<ProtectedRouteVerifyOnlyProps> = ({ children }) => {
    const { loading, isAuthenticated, isVerified } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isAuthenticated && !isVerified) {
            navigate("/email-verify", { state: {type: 'failure', text: 'メール認証を完了してください。'}, replace: true });
        }
    }, [loading, isAuthenticated, isVerified, navigate]);

    if (loading) {
        return (
            <h1>Loading...</h1>
        );
    }

    return children;
};

export default ProtectedRouteVerifyOnly;