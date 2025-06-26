import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchAuth } from "../../store/reducers/authAndLocation";
import Loading from "../Loading/Loading";

type ProtectedRouteNoAuthProps = {
    children: ReactNode;
};

const ProtectedRouteNoAuth: React.FC<ProtectedRouteNoAuthProps> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const authAndLocation = useSelector((state: RootState) => state.authAndLocation);

    // ヘッダーの切り替え & 認証状態の更新
    useLayoutEffect(() => {
        dispatch(fetchAuth(location.pathname));
    }, [location.pathname]);

    // ログインしている場合、商品一覧画面へリダイレクト
    useEffect(() => {
        if (!authAndLocation.loading && authAndLocation.isAuthenticated && authAndLocation.location === location.pathname) {
            navigate('/', { state: {type: 'failure', text: '先にログアウトしてください。'}, replace: true });
        }
    }, [authAndLocation.loading, authAndLocation.isAuthenticated, authAndLocation.location]);

    if (authAndLocation.loading || authAndLocation.isAuthenticated) {
        return (
            <Loading />
        );
    }

    if (!authAndLocation.loading && !authAndLocation.isAuthenticated && authAndLocation.location === location.pathname) {
        return children;
    }
};

export default ProtectedRouteNoAuth;