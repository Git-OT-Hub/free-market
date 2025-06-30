import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import { ImStarEmpty, ImStarFull, ImBubble2 } from "react-icons/im";
import http from "../../lib/axios";
import type { ItemDetailType } from "../../types/stateType";
import { StyledContent, StyledImage, StyledDetail, StyledName, StyledBrand, StyledPrice, StyledIcons, StyledStar, StyledBubble, StyledButLink, StyledDescription, StyledInformation, StyledTd } from "./StyledItemDetail";

const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;
const HTTP_UNAUTHORIZED = 401;

const ItemDetail: React.FC = () => {
    const { id } = useParams();
    const [itemDetail, setItemDetail] = useState<ItemDetailType>();
    const imageUrl = "http://localhost:80/storage/";

    // 商品の詳細情報取得
    useEffect(() => {
        http.get(`/api/items/${id}`).then((res) => {
            if (res.status === HTTP_OK && !!res.data) {
                setItemDetail({...res.data});
            }
        }).catch(() => {
            alert('商品の詳細情報取得に失敗しました。');
        });
    }, []);
    console.log(itemDetail);

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
                    <StyledStar>
                        <IconContext.Provider value={{ style: { cursor: 'pointer', fontSize: '1.5rem' } }}>
                            <ImStarEmpty />
                        </IconContext.Provider>
                    </StyledStar>
                    <StyledBubble>
                        <IconContext.Provider value={{ style: { cursor: 'pointer', fontSize: '1.5rem' } }}>
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