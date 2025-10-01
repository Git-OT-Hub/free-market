import { useEffect, useState, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import http from "../../lib/axios";
import { success, failure } from "../../store/reducers/flashMessage";
import type { AppDispatch } from "../../store/store";
import ExhibitList from "../../components/ItemList/ExhibitList";
import PurchaseList from "../../components/ItemList/PurchaseList";
import TransactionList from "../../components/ItemList/TransactionList";
import type { ItemType, MypageProfileType, TransactionType } from "../../types/stateType";
import { StyledHeader, StyledHeaderExhibitList, StyledHeaderPurchaseList, StyledProfile, StyledProfileInfo, StyledProfileBtn, StyledProfileImg, StyledProfileName, StyledNoImage, StyledButLink, StyledHeaderTransactionList, StyledTotalCount } from "./StyledMypage";

const HTTP_OK = 200;

const Mypage: React.FC = () => {
    const [isExhibitList, setIsExhibitList] = useState<boolean>(true);
    const [isPurchaseList, setIsPurchaseList] = useState<boolean>(false);
    const [isTransactionList, setIsTransactionList] = useState<boolean>(false);

    const [exhibitList, setExhibitList] = useState<ItemType[]>([]);
    const [purchaseList, setPurchaseList] = useState<ItemType[]>([]);
    const [transactionList, setTransactionList] = useState<TransactionType[]>([]);
    const [totalUnreadCount, setTotalUnreadCount] = useState<number>(0);

    const [profile, setProfile] = useState<MypageProfileType>({
        image: "",
        name: "",
    });
    const imageUrl = "http://localhost:80/storage/";

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const query = new URLSearchParams(location.search);
    const keyword = query.get('search');

    // 商品一覧取得
    useLayoutEffect(() => {
        http.get('/api/profile/my_items').then((res) => {
            console.log(res)
            if (res.status === HTTP_OK) {
                const allExhibitList = res.data.exhibitList;
                const allPurchaseList = res.data.purchaseList;
                const allTransactionList = res.data.transactionList;

                setProfile({
                    image: res.data.profileImage,
                    name: res.data.userName,
                });

                setTotalUnreadCount(res.data.totalUnreadCount);

                if (keyword) {
                    const filteredExhibitList = allExhibitList.filter((item: ItemType) => item.name.includes(keyword));
                    const filteredPurchaseList = allPurchaseList.filter((item: ItemType) => item.name.includes(keyword));
                    const filteredTransactionList = allTransactionList.filter((item: ItemType) => item.name.includes(keyword));

                    setExhibitList([...filteredExhibitList]);
                    setPurchaseList([...filteredPurchaseList]);
                    setTransactionList([...filteredTransactionList]);
                } else {
                    setExhibitList([...allExhibitList]);
                    setPurchaseList([...allPurchaseList]);
                    setTransactionList([...allTransactionList]);
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
        setIsTransactionList(false);
        setIsExhibitList(true);
    };

    const clickedPurchaseList = () => {
        setIsExhibitList(false);
        setIsTransactionList(false);
        setIsPurchaseList(true);
    };

    const clickedTransactionList = () => {
        setIsExhibitList(false);
        setIsPurchaseList(false);
        setIsTransactionList(true);
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
                <StyledHeaderTransactionList
                    $isTransactionList={isTransactionList}
                >
                    <span
                        onClick={clickedTransactionList}
                    >取引中の商品</span>
                    {totalUnreadCount > 0 && (
                        <StyledTotalCount>
                            {totalUnreadCount}
                        </StyledTotalCount>
                    )}
                </StyledHeaderTransactionList>
            </StyledHeader>
            {isExhibitList && <ExhibitList exhibitList={exhibitList} />}
            {isPurchaseList && <PurchaseList purchaseList={purchaseList} />}
            {isTransactionList && <TransactionList transactionList={transactionList} />}
        </div>
    );
}

export default Mypage;