import { useEffect, useState, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import http from "../../lib/axios";
import { success, failure } from "../../store/reducers/flashMessage";
import type { AppDispatch } from "../../store/store";
import ExhibitList from "../../components/ItemList/ExhibitList";
import PurchaseList from "../../components/ItemList/PurchaseList";
import type { ItemType, MypageProfileType } from "../../types/stateType";
import { StyledHeader, StyledHeaderExhibitList, StyledHeaderPurchaseList, StyledProfile, StyledProfileInfo, StyledProfileBtn, StyledProfileImg, StyledProfileName, StyledNoImage, StyledButLink } from "./StyledMypage";

const HTTP_OK = 200;

const Mypage: React.FC = () => {
    const [isExhibitList, setIsExhibitList] = useState<boolean>(true);
    const [isPurchaseList, setIsPurchaseList] = useState<boolean>(false);

    const [exhibitList, setExhibitList] = useState<ItemType[]>([]);
    const [purchaseList, setPurchaseList] = useState<ItemType[]>([]);

    const [profile, setProfile] = useState<MypageProfileType>({
        image: "",
        name: "",
    });
    const imageUrl = "http://localhost:80/storage/";
    console.log(profile);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const query = new URLSearchParams(location.search);
    const keyword = query.get('search');

    // 商品一覧取得
    useLayoutEffect(() => {
        http.get('/api/profile/my_items').then((res) => {
            if (res.status === HTTP_OK) {
                const allExhibitList = res.data.exhibitList;
                const allPurchaseList = res.data.purchaseList;

                setProfile({
                    image: res.data.profileImage,
                    name: res.data.userName,
                });

                if (keyword) {
                    const filteredExhibitList = allExhibitList.filter((item: ItemType) => item.name.includes(keyword));
                    const filteredPurchaseList = allPurchaseList.filter((item: ItemType) => item.name.includes(keyword));

                    setExhibitList([...filteredExhibitList]);
                    setPurchaseList([...filteredPurchaseList]);
                } else {
                    setExhibitList([...allExhibitList]);
                    setPurchaseList([...allPurchaseList]);
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

    const clickedExhibitList = () => {
        setIsPurchaseList(false);
        setIsExhibitList(true);
    };

    const clickedPurchaseList = () => {
        setIsExhibitList(false);
        setIsPurchaseList(true);
    };

    return (
        <div>
            <StyledProfile>
                <StyledProfileInfo>
                    <StyledProfileImg>
                        {profile.image ? (
                            <div>
                                <img src={imageUrl + profile.image} alt="preview img" />
                            </div>
                        ) : (
                            <StyledNoImage></StyledNoImage>
                        )}
                    </StyledProfileImg>
                    <StyledProfileName>
                        <span>{profile.name}</span>
                    </StyledProfileName>
                </StyledProfileInfo>
                <StyledProfileBtn>
                    <StyledButLink
                        to="/mypage/profile"
                    >
                        プロフィールを編集
                    </StyledButLink>
                </StyledProfileBtn>
            </StyledProfile>
            <StyledHeader>
                <StyledHeaderExhibitList
                    $isExhibitList={isExhibitList}
                >
                    <span
                        onClick={clickedExhibitList}
                    >出品した商品</span>
                </StyledHeaderExhibitList>
                <StyledHeaderPurchaseList
                    $isPurchaseList={isPurchaseList}
                >
                    <span
                        onClick={clickedPurchaseList}
                    >購入した商品</span>
                </StyledHeaderPurchaseList>
            </StyledHeader>
            {isExhibitList && <ExhibitList exhibitList={exhibitList} />}
            {isPurchaseList && <PurchaseList purchaseList={purchaseList} />}
        </div>
    );
}

export default Mypage;