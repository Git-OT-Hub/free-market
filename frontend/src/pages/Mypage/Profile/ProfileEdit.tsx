import { useEffect, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import http, { httpMultipart } from "../../../lib/axios";
import { success, failure } from "../../../store/reducers/flashMessage";
import type { AppDispatch } from "../../../store/store";
import { StyledContent, StyledImage, StyledImageCircle, StyledNoImage, StyledImageLabel, StyledFormDiv } from "./StyledProfile";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import type { UserInformationError } from "../../../types/stateType";


const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_UNPROCESSABLE_ENTITY = 422;

const ProfileEdit: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [postCode, setPostCode] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [building, setBuilding] = useState<string>('');
    const [errors, setErrors] = useState<UserInformationError>({
        name: [],
        post_code: [],
        address: [],
        building: [],
        image: [],
    });
    const [fileTypeError, setFileTypeError] = useState<string>('');
    const [newImage, setNewImage] = useState<File>();
    const [preview, setPreview] = useState<string>("");
    const imageErrorMessages = errors['image'] || [];

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

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
                if (res.data.profile.image) {
                    setPreview(`http://localhost:80/storage/${res.data.profile.image}`);
                }
            }
        });
    }, []);

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

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files || files.length === 0) {
            return;
        }

        const file = files[0];
        const isFileType = !["image/jpeg", "image/png"].includes(file.type);

        setFileTypeError('');
        if (isFileType) {
            setFileTypeError('ファイル形式は、jpeg, png のみ添付可能です。');
            return;
        };

        if (file.size > 1 * 1024 * 1024) {
            setFileTypeError('ファイルサイズは 1MB 以下にしてください。');
            return;
        }

        setNewImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const profileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("post_code", postCode);
            formData.append("address", address);
            formData.append("building", building);
            if (newImage) {
                formData.append("image", newImage);
            }

            http.get('/sanctum/csrf-cookie').then(() => {
                httpMultipart.post('/api/profile/update', formData).then((res) => {
                    if (res.status === HTTP_CREATED) {
                        setErrors({
                            name: [],
                            post_code: [],
                            address: [],
                            building: [],
                            image: [],
                        });
                        navigate(location.pathname, { state: {type: 'success', text: 'プロフィールを更新しました'}, replace: true });
                    }
                }).catch((e) => {
                    if (e.response.status === HTTP_UNPROCESSABLE_ENTITY) {
                        const responseData = {...e.response.data.errors};
                        setErrors(responseData);
                    }
                });
            });
        } catch (error) {
            alert('プロフィールの更新に失敗しました。');
        }
    };

    return (
        <StyledContent>
            <h1>プロフィール設定</h1>
            <form onSubmit={profileUpdate}>
                <StyledImage>
                    <StyledImageCircle>
                        {preview ? (
                            <div>
                                <img src={preview} alt="preview img" />
                            </div>
                        ) : (
                            <StyledNoImage></StyledNoImage>
                        )}
                    </StyledImageCircle>
                    <StyledImageLabel>
                        <label>
                            画像を選択する
                            <input
                                type="file"
                                accept="image/jpeg, image/png"
                                onChange={handleFile}
                            />
                        </label>
                        {fileTypeError && (
                            <p>{fileTypeError}</p>
                        )}
                        {imageErrorMessages && (
                            <ul>
                                {imageErrorMessages.map((err, idx) => {
                                    return (
                                        <li key={idx}>{err}</li>
                                    );
                                })}
                            </ul>
                        )}
                    </StyledImageLabel>
                </StyledImage>
                <Input
                    label="ユーザー名"
                    errorKey="name"
                    errors={errors}
                    type="text"
                    value={name}
                    fn={useCallback((e) => setName(e.target.value), [])}
                />
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

export default ProfileEdit;