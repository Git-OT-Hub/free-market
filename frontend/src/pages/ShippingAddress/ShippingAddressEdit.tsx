import { useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../lib/axios";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import type { UserInformationError } from "../../types/stateType";
import { StyledContent, StyledFormDiv } from "./StyledShippingAddressEdit";

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_UNPROCESSABLE_ENTITY = 422;

const ShippingAddressEdit: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [postCode, setPostCode] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [building, setBuilding] = useState<string>('');
    const [errors, setErrors] = useState<UserInformationError>({
        name: [],
        post_code: [],
        address: [],
        building: [],
    });

    const navigate = useNavigate();
    const { id } = useParams();

    // プロフィールデータの取得
    useEffect(() => {
        http.get('/api/profile').then((res) => {
            if (res.status === HTTP_OK) {
                if (res.data.userName) {
                    setName(res.data.userName);
                }
                if (res.data.profile.post_code) {
                    setPostCode(res.data.profile.post_code);
                }
                if (res.data.profile.address) {
                    setAddress(res.data.profile.address);
                }
                if (res.data.profile.building) {
                    setBuilding(res.data.profile.building);
                }
            }
        });
    }, []);

    const shippingAddressUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = {
                name: name,
                post_code: postCode,
                address: address,
                building: building,
            };

            http.get('/sanctum/csrf-cookie').then(() => {
                http.post('/api/profile/address/update', data).then((res) => {
                    if (res.status === HTTP_CREATED) {
                        navigate(`/purchase/${id}`, { state: {type: 'success', text: '配送先を変更しました'}, replace: true });
                    }
                }).catch((e) => {
                    if (e.response.status === HTTP_UNPROCESSABLE_ENTITY) {
                        const responseData = {...e.response.data.errors};
                        setErrors(responseData);
                    }
                });
            });
        } catch (error) {
            alert('住所の変更に失敗しました。');
        }
    };

    return (
        <StyledContent>
            <h1>住所の変更</h1>
            <form onSubmit={shippingAddressUpdate}>
                <Input
                    label="郵便番号"
                    errorKey="post_code"
                    errors={errors}
                    type="text"
                    value={postCode}
                    fn={useCallback((e) => setPostCode(e.target.value), [])}
                />
                <Input
                    label="住所"
                    errorKey="address"
                    errors={errors}
                    type="text"
                    value={address}
                    fn={useCallback((e) => setAddress(e.target.value), [])}
                />
                <Input
                    label="建物名"
                    errorKey="building"
                    errors={errors}
                    type="text"
                    value={building}
                    fn={useCallback((e) => setBuilding(e.target.value), [])}
                />
                <StyledFormDiv>
                    <Button
                        label="更新する"
                    />
                </StyledFormDiv>
            </form>
        </StyledContent>
    );
};

export default ShippingAddressEdit;