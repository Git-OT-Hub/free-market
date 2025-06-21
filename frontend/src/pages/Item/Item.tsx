import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { success, failure } from "../../store/reducers/flashMessage";
import { fetchAuth } from "../../store/reducers/authAndLocation";
import type { AppDispatch } from "../../store/store";

const Item: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    // ヘッダーの切り替え
    useEffect(() => {
        dispatch(fetchAuth(location.pathname));
    }, [location.pathname]);

    // フラッシュメッセージ表示
    useEffect(() => {
        if (location.state) {
            const createFlashMessage = () => {
                switch (location.state.type) {
                    case 'success':
                        return dispatch(success(location.state.text));
                    case 'failure':
                        return dispatch(failure(location.state.text));
                    default:
                        alert('不明なメッセージです');
                }
            };

            createFlashMessage();

            navigate(location.pathname, { replace: true });
        }
    }, [location.state, dispatch]);

    return (
        <>
            <h1>アイテム一覧ページ</h1>
        </>
    );
};

export default Item;