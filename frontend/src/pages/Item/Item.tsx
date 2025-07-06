import { useEffect, useState, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import http from "../../lib/axios";
import { success, failure } from "../../store/reducers/flashMessage";
import type { AppDispatch } from "../../store/store";
import Recommendation from "../../components/ItemList/Recommendation";
import MyList from "../../components/ItemList/MyList";
import type { ItemType } from "../../types/stateType";
import { StyledHeader, StyledRecommendation, StyledMyList } from "./StyledItem";

const HTTP_OK = 200;

const Item: React.FC = () => {
    const [isRecommendation, setIsRecommendation] = useState<boolean>(true);
    const [isMyList, setIsMyList] = useState<boolean>(false);

    const [items, setItems] = useState<ItemType[]>([]);
    const [myList, setMyList] = useState<ItemType[]>([]);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const query = new URLSearchParams(location.search);
    const keyword = query.get('search');

    // 商品一覧取得
    useLayoutEffect(() => {
        http.get('/api/items').then((res) => {
            if (res.status === HTTP_OK && res.data.items.length !== 0) {
                const allItems = res.data.items;
                const allMyList = res.data.my_list;

                if (keyword) {
                    const filteredItems = allItems.filter((item: ItemType) => item.name.includes(keyword));
                    const filteredMyList = allMyList.filter((item: ItemType) => item.name.includes(keyword));

                    setItems([...filteredItems]);
                    setMyList([...filteredMyList]);
                } else {
                    setItems([...allItems]);
                    setMyList([...allMyList]);
                }
            }
        }).catch(() => {
            alert('商品一覧のデータ取得に失敗しました。');
        });
    }, [keyword]);

    // フラッシュメッセージ表示
    useEffect(() => {
        if (location.state?.type) {
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

    const clickedRecommendation = () => {
        setIsMyList(false);
        setIsRecommendation(true);
    };

    const clickedMyList = () => {
        setIsRecommendation(false);
        setIsMyList(true);
    };

    return (
        <div>
            <StyledHeader>
                <StyledRecommendation
                    $isRecommendation={isRecommendation}
                >
                    <span
                        onClick={clickedRecommendation}
                    >おすすめ</span>
                </StyledRecommendation>
                <StyledMyList
                    $isMyList={isMyList}
                >
                    <span
                        onClick={clickedMyList}
                    >マイリスト</span>
                </StyledMyList>
            </StyledHeader>
            {isRecommendation && <Recommendation items={items} />}
            {isMyList && <MyList myList={myList} />}
        </div>
    );
};

export default Item;