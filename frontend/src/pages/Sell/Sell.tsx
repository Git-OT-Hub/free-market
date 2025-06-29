import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import http, { httpMultipart } from "../../lib/axios";
import { StyledContent, StyledImage, StyledImageRectangle, StyledNoImage, StyledImageLabel, StyledImageError, StyledItemDetails, StyledCategoryLabel, StyledSelect, StyledNameAndDescription, StyledTextarea, StyledFormDiv, StyledError } from "./StyledSell";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import type { UserInformationError, Category, State } from "../../types/stateType";

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_UNPROCESSABLE_ENTITY = 422;

const Sell: React.FC = () => {
    const [errors, setErrors] = useState<UserInformationError>({
        image: [],
        category_id: [],
        state: [],
        name: [],
        brand: [],
        description: [],
        price: [],
    });

    // 画像
    const [fileTypeError, setFileTypeError] = useState<string>('');
    const [newImage, setNewImage] = useState<File>();
    const [preview, setPreview] = useState<string>("");
    const imageErrorMessages = errors['image'] || [];
    // カテゴリー
    const [categories, setCategories] = useState<Category[]>([]);
    const categoryErrorMessages = errors['category_id'] || [];
    // 商品の状態
    const [state, setState] = useState<string>("");
    const [stateOptions, setStateOptions] = useState<State[]>([]);
    const stateErrorMessages = errors['state'] || [];
    // 商品名
    const [name, setName] = useState<string>("");
    // ブランド名
    const [brand, setBrand] = useState<string>("");
    // 商品の説明
    const [description, setDescription] = useState<string>("");
    const descriptionErrorMessages = errors['description'] || [];
    // 販売価格
    const [price, setPrice] = useState<string>("");

    const navigate = useNavigate();

    // カテゴリー、商品状態の取得
    useEffect(() => {
        http.get('/api/categories').then((res) => {
            if (res.status === HTTP_OK && res.data.categories.length !== 0) {
                setCategories([...res.data.categories]);
            }
            if (res.status === HTTP_OK && res.data.itemStates.length !== 0) {
                setStateOptions([...res.data.itemStates]);
            }
        });
    }, []);

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

    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCategories = categories.map((category) => {
            const newCategory = {...category};
            if (newCategory.id === Number(e.target.value)) {
                newCategory.checked = !category.checked;
            }

            return newCategory;
        });

        setCategories(newCategories);
    };

    const createItem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const filteredCategories = categories.filter((category) => {
                return category.checked === true;
            }).map((category) => {
                return category.id
            });

            const formData = new FormData();
            if (newImage) {
                formData.append("image", newImage);
            }
            formData.append("category_id", JSON.stringify(filteredCategories));
            formData.append("state", state);
            formData.append("name", name);
            formData.append("brand", brand);
            formData.append("description", description);
            formData.append("price", price);

            http.get('/sanctum/csrf-cookie').then(() => {
                httpMultipart.post('/api/items', formData).then((res) => {
                    if (res.status === HTTP_CREATED) {
                        console.log(res);
                        setErrors({
                            image: [],
                            category_id: [],
                            state: [],
                            name: [],
                            brand: [],
                            description: [],
                            price: [],
                        });
                        navigate('/', { state: {type: 'success', text: '商品を出品しました'}, replace: true });
                    }
                }).catch((e) => {
                    console.log(e);
                    if (e.response.status === HTTP_UNPROCESSABLE_ENTITY) {
                        const responseData = {...e.response.data.errors};
                        setErrors(responseData);
                    }
                });
            });
        } catch (error) {
            alert('商品の出品に失敗しました。');
        }
    };

    return (
        <StyledContent>
            <h1>商品の出品</h1>
            <form onSubmit={createItem}>
                <StyledImage>
                    <p>商品画像</p>
                    <StyledImageRectangle>
                        {preview ? (
                            <img src={preview} alt="preview img" />
                        ) : (
                            <StyledNoImage>
                                <StyledImageLabel
                                    $isPreview={!preview}
                                >
                                    <label>
                                        画像を選択する
                                        <input
                                            type="file"
                                            accept="image/jpeg, image/png"
                                            onChange={handleFile}
                                        />
                                    </label>
                                </StyledImageLabel>
                            </StyledNoImage>
                        )}
                    </StyledImageRectangle>
                    {preview && (
                        <StyledImageLabel
                            $isPreview={!preview}
                        >
                            <label>
                                画像を選択する
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    onChange={handleFile}
                                />
                            </label>
                        </StyledImageLabel>
                    )}
                    <StyledImageError>
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
                    </StyledImageError>
                </StyledImage>
                <StyledItemDetails>
                    <h2>商品の詳細</h2>
                    <h3>カテゴリー</h3>
                    <StyledError>
                        {categoryErrorMessages && (
                            <ul>
                                {categoryErrorMessages.map((err, idx) => {
                                    return (
                                        <li key={idx}>{err}</li>
                                    );
                                })}
                            </ul>
                        )}
                    </StyledError>
                    <div>
                        {categories.map((category) => {
                            return (
                                <StyledCategoryLabel
                                    key={category.id}
                                    $isChecked={category.checked}
                                >
                                    {category.content}
                                    <input
                                        type="checkbox"
                                        value={category.id}
                                        checked={category.checked}
                                        onChange={handleCheckBox}
                                    />
                                </StyledCategoryLabel>
                            );
                        })}
                    </div>
                    <StyledSelect>
                        <h3>商品の状態</h3>
                        <StyledError>
                            {stateErrorMessages && (
                                <ul>
                                    {stateErrorMessages.map((err, idx) => {
                                        return (
                                            <li key={idx}>{err}</li>
                                        );
                                    })}
                                </ul>
                            )}
                        </StyledError>
                        <select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        >
                            <option value="">
                                選択してください
                            </option>
                            {stateOptions.map((state) => {
                                return (
                                    <option
                                        key={state.value}
                                        value={state.value}
                                    >{state.label}</option>
                                );
                            })}
                        </select>
                    </StyledSelect>
                </StyledItemDetails>
                <StyledNameAndDescription>
                    <h2>商品名と説明</h2>
                    <Input
                        label="商品名"
                        errorKey="name"
                        errors={errors}
                        type="text"
                        value={name}
                        fn={useCallback((e) => setName(e.target.value), [])}
                    />
                    <Input
                        label="ブランド名"
                        errorKey="brand"
                        errors={errors}
                        type="text"
                        value={brand}
                        fn={useCallback((e) => setBrand(e.target.value), [])}
                    />
                    <StyledTextarea>
                        <p>商品の説明</p>
                        <StyledError>
                            {descriptionErrorMessages && (
                                <ul>
                                    {descriptionErrorMessages.map((err, idx) => {
                                        return (
                                            <li key={idx}>{err}</li>
                                        );
                                    })}
                                </ul>
                            )}
                        </StyledError>
                        <textarea
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </StyledTextarea>
                    <Input
                        label="販売価格"
                        errorKey="price"
                        errors={errors}
                        type="text"
                        value={price}
                        fn={useCallback((e) => setPrice(e.target.value), [])}
                        placeholder="¥"
                    />
                </StyledNameAndDescription>
                <StyledFormDiv>
                    <Button
                        label="出品する"
                    />
                </StyledFormDiv>
            </form>
        </StyledContent>
    );
};

export default Sell;