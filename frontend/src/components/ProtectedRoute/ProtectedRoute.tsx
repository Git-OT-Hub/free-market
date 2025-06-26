import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchAuth } from "../../store/reducers/authAndLocation";
import Loading from "../Loading/Loading";

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const authAndLocation = useSelector((state: RootState) => state.authAndLocation);

    // ヘッダーの切り替え & 認証状態の更新
    useLayoutEffect(() => {
        dispatch(fetchAuth(location.pathname));
    }, [location.pathname]);

    // 未ログイン時、または、メール認証を実施していない場合、各画面へリダイレクト
    useEffect(() => {
        if (!authAndLocation.loading && authAndLocation.location === location.pathname) {
            if (!authAndLocation.isAuthenticated && authAndLocation.location === location.pathname) {
                navigate('/login', { state: {type: 'failure', text: 'ログインが必要です'}, replace: true });
            } else if (!authAndLocation.isVerified && authAndLocation.location === location.pathname) {
                navigate('/email-verify', { state: {type: 'failure', text: 'メール認証を完了してください。'}, replace: true });
            }
        }
    }, [authAndLocation.loading, authAndLocation.isAuthenticated, authAndLocation.isVerified, authAndLocation.location]);

    if (authAndLocation.loading || !authAndLocation.isAuthenticated || !authAndLocation.isVerified) {
        return (
            <Loading />
        );
    }

    if (!authAndLocation.loading && authAndLocation.isAuthenticated && authAndLocation.isVerified && authAndLocation.location === location.pathname) {
        return children;
    }
};

export default ProtectedRoute;