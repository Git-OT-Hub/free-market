import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchAuth } from "../../store/reducers/authAndLocation";
import Loading from "../Loading/Loading";

type ProtectedRouteAuthProps = {
    children: ReactNode;
};

const ProtectedRouteAuth: React.FC<ProtectedRouteAuthProps> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const authAndLocation = useSelector((state: RootState) => state.authAndLocation);

    // ヘッダーの切り替え & 認証状態の更新
    useLayoutEffect(() => {
        dispatch(fetchAuth(location.pathname));
    }, [location.pathname]);

    // 未ログインの場合、ログイン画面へリダイレクト
    useEffect(() => {
        if (!authAndLocation.loading && !authAndLocation.isAuthenticated && authAndLocation.location === location.pathname) {
            navigate('/login', { state: {type: 'failure', text: 'ログインが必要です'}, replace: true });
        }
    }, [authAndLocation.loading, authAndLocation.isAuthenticated, authAndLocation.location]);

    if (authAndLocation.loading) {
        return (
            <Loading />
        );
    }

    if (!authAndLocation.loading && authAndLocation.isAuthenticated && authAndLocation.location === location.pathname) {
        return children;
    }
};

export default ProtectedRouteAuth;