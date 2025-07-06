import { useLayoutEffect, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { success, failure } from "../../store/reducers/flashMessage";
import http from "../../lib/axios";
import type { AppDispatch } from "../../store/store";
import type { PurchaseInfoType, PurchaseErrorType, ShippingAddressType } from "../../types/stateType";
import Link from "../../components/Link/Link";
import { StyledContent, StyledPurchaseInfo, StyledPurchaseReconfirmation, StyledItemInfo, StyledItemImg, StyledItemText, StyledPurchaseMethod, StyledError, StyledShippingAddress, StyledShippingAddressHeader, StyledShippingAddressBody, StyledButton } from "./StyledPurchase";

const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_UNPROCESSABLE_ENTITY = 422;

const Purchase: React.FC = () => {
    const { id } = useParams();
    const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfoType>();
    const [errors, setErrors] = useState<PurchaseErrorType>({
        payment_method: [],
        post_code: [],
        address: [],
        building: [],
    });
    // 支払い方法
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const paymentMethodErrorMessages = errors['payment_method'] || [];
    // 配送先
    const [shippingAddress, setShippingAddress] = useState<ShippingAddressType>({
        post_code: "",
        address: "",
        building: "",
    });
    const postCodeErrorMessages = errors['post_code'] || [];
    const addressErrorMessages = errors['address'] || [];
    const buildingErrorMessages = errors['building'] || [];

    const imageUrl = "http://localhost:80/storage/";

    let selectedPaymentMethod: string = "";
    purchaseInfo?.payment_methods.forEach((method) => {
        if (String(method.value) === paymentMethod) {
            selectedPaymentMethod = method.label;
        }
    });

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();

    // 購入に必要な情報取得
    useLayoutEffect(() => {
        http.get(`/api/items/${id}/purchase/create`).then((res) => {
            if (res.status === HTTP_OK) {
                setPurchaseInfo({...res.data});
                setShippingAddress({
                    post_code: res.data.shipping_address.post_code,
                    address: res.data.shipping_address.address,
                    building: res.data.shipping_address.building,
                });
            }

            if (res.status === HTTP_NO_CONTENT) {
                navigate('/', { state: {type: 'failure', text: '存在しないコンテンツです'}, replace: true });
            }
        }).catch((res) => {
            if (res.status === HTTP_UNAUTHORIZED) {
                navigate('/', { state: {type: 'failure', text: 'アクセスできないコンテンツです'}, replace: true });
                return;
            }

            if (res.status === HTTP_BAD_REQUEST && res.response.data === 'sold') {
                navigate('/', { state: {type: 'failure', text: '売り切れの商品です'}, replace: true });
                return;
            }

            alert('購入に必要な情報の取得に失敗しました。');
        });
    }, []);
    console.log(purchaseInfo);

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

    const createCheckoutSession = () => {
        try {
            const data = {
                payment_method: paymentMethod,
                post_code: shippingAddress.post_code,
                address: shippingAddress.address,
                building: shippingAddress.building,
            };

            http.get('/sanctum/csrf-cookie').then(() => {
                http.post(`/api/items/${id}/purchase/checkout`, data).then((res) => {
                    if (res.status === HTTP_OK) {
                        loadStripe(res.data.publicKey).then((stripe) => {
                            if (stripe) {
                                stripe.redirectToCheckout({
                                    sessionId: res.data.id,
                                });
                            } else {
                                alert('Stripeの初期化に失敗しました。');
                            }
                        });
                    }
                }).catch((e) => {
                    if (e.response.status === HTTP_UNPROCESSABLE_ENTITY) {
                        const responseData = {...e.response.data.errors};
                        setErrors(responseData);
                    }
                });
            });
        } catch (error) {
            alert('決済画面への接続に失敗しました。');
        }
    };

    return (
        <StyledContent>
            <StyledPurchaseInfo>
                <StyledItemInfo>
                    <StyledItemImg>
                        <img src={imageUrl + purchaseInfo?.image} alt="item img" />
                    </StyledItemImg>
                    <StyledItemText>
                        <h2>{purchaseInfo?.name}</h2>
                        <p>
                            ¥ <span>{purchaseInfo?.price}</span>
                        </p>
                    </StyledItemText>
                </StyledItemInfo>
                <StyledPurchaseMethod>
                    <h3>支払い方法</h3>
                    <StyledError>
                        {paymentMethodErrorMessages && (
                            <ul>
                                {paymentMethodErrorMessages.map((err, idx) => {
                                    return (
                                        <li key={idx}>{err}</li>
                                    );
                                })}
                            </ul>
                        )}
                    </StyledError>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="">
                            選択してください
                        </option>
                        {purchaseInfo?.payment_methods.map((paymentMethod) => {
                            return (
                                <option
                                    key={paymentMethod.value}
                                    value={paymentMethod.value}
                                >{paymentMethod.label}</option>
                            );
                        })}
                    </select>
                </StyledPurchaseMethod>
                <StyledShippingAddress>
                    <StyledShippingAddressHeader>
                        <h3>配送先</h3>
                        <Link
                            to={`/purchase/address/${id}`}
                            text="変更する"
                            $color="#0873cc"
                        />
                    </StyledShippingAddressHeader>
                    <StyledError>
                        {postCodeErrorMessages && (
                            <ul>
                                {postCodeErrorMessages.map((err, idx) => {
                                    return (
                                        <li key={idx}>{err}</li>
                                    );
                                })}
                            </ul>
                        )}
                    </StyledError>
                    <StyledError>
                        {addressErrorMessages && (
                            <ul>
                                {addressErrorMessages.map((err, idx) => {
                                    return (
                                        <li key={idx}>{err}</li>
                                    );
                                })}
                            </ul>
                        )}
                    </StyledError>
                    <StyledError>
                        {buildingErrorMessages && (
                            <ul>
                                {buildingErrorMessages.map((err, idx) => {
                                    return (
                                        <li key={idx}>{err}</li>
                                    );
                                })}
                            </ul>
                        )}
                    </StyledError>
                    <StyledShippingAddressBody>
                        <p>〒 {shippingAddress.post_code}</p>
                        <p>{shippingAddress.address}</p>
                        <p>{shippingAddress.building}</p>
                    </StyledShippingAddressBody>
                </StyledShippingAddress>
            </StyledPurchaseInfo>
            <StyledPurchaseReconfirmation>
                <table>
                    <tbody>
                        <tr>
                            <td>商品代金</td>
                            <td>¥ <span>{purchaseInfo?.price}</span></td>
                        </tr>
                        <tr>
                            <td>支払い方法</td>
                            <td>
                                {selectedPaymentMethod && selectedPaymentMethod}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <StyledButton
                    onClick={createCheckoutSession}
                >
                    購入する
                </StyledButton>
            </StyledPurchaseReconfirmation>
        </StyledContent>
    );
};

export default Purchase;