import { useLayoutEffect, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { ImStarEmpty, ImStarFull, ImBubble2 } from "react-icons/im";
import http from "../../lib/axios";
import { success, failure } from "../../store/reducers/flashMessage";
import type { AppDispatch } from "../../store/store";
import type { ItemDetailType } from "../../types/stateType";
import { StyledContent, StyledImage, StyledDetail, StyledName, StyledBrand, StyledPrice, StyledIcons, StyledStar, StyledBubble, StyledButLink, StyledDescription, StyledInformation, StyledTd } from "./StyledItemDetail";

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

const ItemDetail: React.FC = () => {
    const { id } = useParams();
    const [itemDetail, setItemDetail] = useState<ItemDetailType>();
    const imageUrl = "http://localhost:80/storage/";

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    // 商品の詳細情報取得
    useLayoutEffect(() => {
        http.get(`/api/items/${id}`).then((res) => {
            if (res.status === HTTP_OK && !!res.data) {
                setItemDetail({...res.data});
            }

            if (res.status === HTTP_NO_CONTENT) {
                navigate('/', { state: {type: 'failure', text: '存在しないコンテンツです'}, replace: true });
            }
        }).catch((res) => {
            if (res.status === HTTP_UNAUTHORIZED) {
                navigate('/', { state: {type: 'failure', text: 'このコンテンツへのアクセスは許可されていません'}, replace: true });
                return;
            }

            alert('商品の詳細情報取得に失敗しました。');
        });
    }, []);
    console.log(itemDetail);

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

    const like = () => {
        try {
            http.get('/sanctum/csrf-cookie').then(() => {
                http.post(`/api/items/${id}/like`).then((res) => {
                    if (res.status === HTTP_NO_CONTENT) {
                        navigate(location.pathname, { state: {type: 'failure', text: '対象のコンテンツがありません'}, replace: true });
                    }

                    if (res.status === HTTP_CREATED) {
                        setItemDetail({...res.data});

                        navigate(location.pathname, { state: {type: 'success', text: 'いいね しました'}, replace: true });
                    }
                }).catch((e) => {
                    if (e.response.status === HTTP_UNAUTHORIZED) {
                        navigate(location.pathname, { state: {type: 'failure', text: 'ログインが必要です'}, replace: true });
                    }

                    if (e.response.status === HTTP_BAD_REQUEST) {
                        navigate(location.pathname, { state: {type: 'failure', text: '既に いいね 済みです'}, replace: true });
                    }
                });
            });
        } catch (error) {
            alert('いいね に失敗しました。');
        }
    };

    const unlike = () => {
        try {
            http.get('/sanctum/csrf-cookie').then(() => {
                http.delete(`/api/items/${id}/like`).then((res) => {
                    if (res.status === HTTP_NO_CONTENT) {
                        navigate(location.pathname, { state: {type: 'failure', text: '対象のコンテンツがありません'}, replace: true });
                    }

                    if (res.status === HTTP_OK) {
                        setItemDetail({...res.data});

                        navigate(location.pathname, { state: {type: 'success', text: 'いいね を解除しました'}, replace: true });
                    }
                }).catch((e) => {
                    if (e.response.status === HTTP_UNAUTHORIZED) {
                        navigate(location.pathname, { state: {type: 'failure', text: 'ログインが必要です'}, replace: true });
                    }

                    if (e.response.status === HTTP_BAD_REQUEST) {
                        navigate(location.pathname, { state: {type: 'failure', text: '既に いいね を解除済みです'}, replace: true });
                    }
                });
            });
        } catch (error) {
            alert('いいね に失敗しました。');
        }
    };

    return (
        <StyledContent>
            <StyledImage>
                <img src={imageUrl + itemDetail?.image} alt="item img" />
                {itemDetail?.sold_at && (
                    <p>Sold</p>
                )}
            </StyledImage>
            <StyledDetail>
                <StyledName>
                    <h1>{itemDetail?.name}</h1>
                </StyledName>
                <StyledBrand>
                    <span>ブランド名 : {itemDetail?.brand}</span>
                </StyledBrand>
                <StyledPrice>
                    ¥ <span>{itemDetail?.price}</span> (税込)
                </StyledPrice>
                <StyledIcons>
                    {itemDetail?.is_like ? (
                        <StyledStar>
                            <IconContext.Provider value={{ style: { cursor: 'pointer', fontSize: '1.5rem' } }}>
                                <ImStarFull
                                    onClick={unlike}
                                />
                            </IconContext.Provider>
                            <span>{itemDetail?.likes_count}</span>
                        </StyledStar>
                    ) : (
                        <StyledStar>
                            <IconContext.Provider value={{ style: { cursor: 'pointer', fontSize: '1.5rem' } }}>
                                <ImStarEmpty
                                    onClick={like}
                                />
                            </IconContext.Provider>
                            <span>{itemDetail?.likes_count}</span>
                        </StyledStar>
                    )}

                    <StyledBubble>
                        <IconContext.Provider value={{ style: { fontSize: '1.5rem' } }}>
                            <ImBubble2 />
                        </IconContext.Provider>
                    </StyledBubble>
                </StyledIcons>
                <StyledButLink
                    to=""
                >
                    購入手続きへ
                </StyledButLink>
                <StyledDescription>
                    <h2>商品説明</h2>
                    <p>{itemDetail?.description}</p>
                </StyledDescription>
                <StyledInformation>
                    <h2>商品の情報</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>カテゴリー</th>
                                <StyledTd>
                                    {itemDetail?.categories.map((category) => {
                                        return (
                                            <span
                                                key={category}
                                            >{category}</span>
                                        );
                                    })}
                                </StyledTd>
                            </tr>
                            <tr>
                                <th>商品の状態</th>
                                <td>{itemDetail?.state}</td>
                            </tr>
                        </tbody>
                    </table>
                </StyledInformation>
            </StyledDetail>
        </StyledContent>
    );
};

export default ItemDetail;