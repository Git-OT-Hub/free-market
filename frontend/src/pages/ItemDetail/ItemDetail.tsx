import { useLayoutEffect, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { ImStarEmpty, ImStarFull, ImBubble2 } from "react-icons/im";
import http from "../../lib/axios";
import { success, failure } from "../../store/reducers/flashMessage";
import type { AppDispatch } from "../../store/store";
import type { ItemDetailType, CommentType, CommentErrorType } from "../../types/stateType";
import Button from "../../components/Button/Button";
import { StyledContent, StyledImage, StyledDetail, StyledName, StyledBrand, StyledPrice, StyledIcons, StyledStar, StyledBubble, StyledButLink, StyledDescription, StyledInformation, StyledTd, StyledCommentContent, StyledCommentArea, StyledCommentInfo, StyledCommentUser, StyledComment, StyledCommentForm, StyledCommentError } from "./StyledItemDetail";

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_UNPROCESSABLE_ENTITY = 422;

const ItemDetail: React.FC = () => {
    const { id } = useParams();
    const [itemDetail, setItemDetail] = useState<ItemDetailType>();
    const [errors, setErrors] = useState<CommentErrorType>({
        comment: [],
    });
    const [comment, setComment] = useState<string>("");
    const commentErrorMessages = errors['comment'] || [];
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

    const createComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = {
                comment: comment,
            };

            http.get('/sanctum/csrf-cookie').then(() => {
                http.post(`/api/items/${id}/comment`, data).then((res) => {
                    if (res.status === HTTP_NO_CONTENT) {
                        navigate(location.pathname, { state: {type: 'failure', text: '対象のコンテンツがありません'}, replace: true });
                    }

                    if (res.status === HTTP_CREATED) {
                        setErrors({
                            comment: [],
                        });
                        setComment("");
                        setItemDetail({...res.data});

                        navigate(location.pathname, { state: {type: 'success', text: 'コメントを送信しました'}, replace: true });
                    }
                }).catch((e) => {
                    if (e.response.status === HTTP_UNAUTHORIZED) {
                        navigate(location.pathname, { state: {type: 'failure', text: 'ログインが必要です'}, replace: true });
                    }

                    if (e.response.status === HTTP_UNPROCESSABLE_ENTITY) {
                        const responseData = {...e.response.data.errors};
                        setErrors(responseData);
                    }
                });
            });
        } catch (error) {
            alert('コメントの送信に失敗しました。');
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
                            <span>{itemDetail?.comments_count}</span>
                        </IconContext.Provider>
                    </StyledBubble>
                </StyledIcons>
                <StyledButLink
                    to={`/purchase/${id}`}
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
                <StyledCommentContent>
                    <h2>コメント({itemDetail?.comments_count})</h2>
                    <StyledCommentArea>
                        {itemDetail?.comments.map((comment: CommentType) => {
                            return (
                                <StyledCommentInfo
                                    key={comment.comment_id}
                                >
                                    <StyledCommentUser>
                                        {comment.user_img ? (
                                            <img src={imageUrl + comment.user_img} alt="user icon" />
                                        ) : (
                                            <div></div>
                                        )}
                                        <span>{comment.user_name}</span>
                                    </StyledCommentUser>
                                    <StyledComment>
                                        <p>{comment.comment}</p>
                                    </StyledComment>
                                </StyledCommentInfo>
                            );
                        })}
                    </StyledCommentArea>
                    <StyledCommentForm>
                        <form onSubmit={createComment}>
                            <h3>商品へのコメント</h3>
                            <StyledCommentError>
                                {commentErrorMessages && (
                                    <ul>
                                        {commentErrorMessages.map((err, idx) => {
                                            return (
                                                <li key={idx}>{err}</li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </StyledCommentError>
                            <textarea
                                rows={8}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button
                                label="コメントを送信する"
                            />
                        </form>
                    </StyledCommentForm>
                </StyledCommentContent>
            </StyledDetail>
        </StyledContent>
    );
};

export default ItemDetail;