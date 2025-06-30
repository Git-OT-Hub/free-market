import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImStarEmpty, ImStarFull, ImBubble2 } from "react-icons/im";
import http from "../../lib/axios";
import type { ItemDetailType } from "../../types/stateType";
import { StyledContent, StyledImage, StyledDetail, StyledName, StyledBrand, StyledPrice } from "./StyledItemDetail";

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
                    <h2>{itemDetail?.name}</h2>
                </StyledName>
                <StyledBrand>
                    <span>ブランド名 : {itemDetail?.brand}</span>
                </StyledBrand>
                <StyledPrice>
                    ¥ <span>{itemDetail?.price}</span> (税込)
                </StyledPrice>
            </StyledDetail>
        </StyledContent>
    );
};

export default ItemDetail;