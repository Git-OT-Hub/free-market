import { StyledContent, StyledOtherTransactions, StyledTransaction, StyledTradingPartner, StyledItem, StyledItemImg, StyledItemText, StyledChat, StyledChatMessages, StyledChatInputArea, StyledChatInputAreaText, StyledChatInputAreaFile, StyledChatInputAreaSubmit, StyledChatInputAreaForm, StyledChatInputAreaView, StyledChatInputAreaPreview, StyledChatInputAreaError } from "./StyledTransaction";
import { useParams } from "react-router-dom";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useRef, useState } from "react";
import { useSaveMessage } from "../../hooks/useSaveMessage";
import { httpMultipart } from "../../lib/axios";
import type { ValidationErrorsType } from "../../types/stateType";

const HTTP_CREATED = 201;
const HTTP_UNPROCESSABLE_ENTITY = 422;

const Transaction: React.FC = () => {
    const { id } = useParams();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [fileTypeError, setFileTypeError] = useState<string>('');
    const [image, setImage] = useState<File>();
    const [preview, setPreview] = useState<string>("");
    const [errors, setErrors] = useState<ValidationErrorsType>({
        errors: {}
    });
    const messageError = errors.errors['message'] || [];
    const imageError = errors.errors['image'] || [];
    const allErrors = [...messageError, ...imageError];

    // メッセージ保持
    const transactionId = id ?? "";
    const [drafts, setDrafts] = useSaveMessage<Record<string, string>>(
        "transactionDrafts",
        {}
    );
    const message = drafts[transactionId] || "";
    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDrafts({
            ...drafts,
            [transactionId]: e.target.value,
        });
    };

    const handleTextAreaHeight = () => {
        const el = textareaRef.current;

        if (el) {
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
        }
    };

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

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("message", message);
        if (image) {
            formData.append("image", image);
        }

        httpMultipart.post(`/api/transaction/${id}/chat`, formData)
            .then((res) => {
                setErrors({errors: {}});

                if (res.status !== HTTP_CREATED) {
                    console.error('予期しないエラー: ', res.status);
                    return;
                }

                console.log(res);

                // 保存したメッセージ削除
                const newDrafts = { ...drafts };
                delete newDrafts[transactionId];
                setDrafts(newDrafts);
                if (textareaRef.current) {
                    textareaRef.current.style.height = "auto";
                }
                // ファイル系削除
                setImage(undefined);
                setPreview("");
                setFileTypeError("");
                const fileInput = document.querySelector<HTMLInputElement>(
                    "input[type='file']"
                );
                if (fileInput) {
                    fileInput.value = "";
                }
            })
            .catch((e) => {
                if (e.response.status === HTTP_UNPROCESSABLE_ENTITY) {
                    setErrors({errors: {...e.response.data.errors}});
                    return;
                }
            });
    };

    return (
        <StyledContent>
            <StyledOtherTransactions>
                <h2>その他の取引</h2>
            </StyledOtherTransactions>
            <StyledTransaction>
                <StyledTradingPartner>
                    <h2>さんとの取引画面</h2>
                    <button>
                        取引を完了する
                    </button>
                </StyledTradingPartner>
                <StyledItem>
                    <StyledItemImg>
                        img
                    </StyledItemImg>
                    <StyledItemText>
                        <h2>商品名</h2>
                        <p>
                            商品価格
                        </p>
                    </StyledItemText>
                </StyledItem>
                <StyledChat>
                    <StyledChatMessages>
                        <div>こんにちは！</div>
                        <div>お元気ですか？</div>
                        <div>テストメッセージ</div>
                    </StyledChatMessages>
                    <StyledChatInputArea>
                        <StyledChatInputAreaForm>
                            <StyledChatInputAreaText>
                                <textarea
                                    ref={textareaRef}
                                    placeholder="取引メッセージを記入してください"
                                    onInput={handleTextAreaHeight}
                                    value={message}
                                    onChange={handleTextAreaChange}
                                />
                            </StyledChatInputAreaText>
                            <StyledChatInputAreaFile>
                                <label>
                                    画像を追加
                                    <input
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        onChange={handleFile}
                                    />
                                </label>
                            </StyledChatInputAreaFile>
                            <StyledChatInputAreaSubmit>
                                <IconContext.Provider value={{ style: { cursor: 'pointer', fontSize: '3rem' } }}>
                                    <IoPaperPlaneOutline
                                        onClick={handleSubmit}
                                    />
                                </IconContext.Provider>
                            </StyledChatInputAreaSubmit>
                        </StyledChatInputAreaForm>
                        <StyledChatInputAreaView>
                            <StyledChatInputAreaError>
                                {fileTypeError && (
                                    <p>{fileTypeError}</p>
                                )}

                                {allErrors && allErrors.map((error, idx) => {
                                    return (
                                        <p key={idx}>{error}</p>
                                    );
                                })}
                            </StyledChatInputAreaError>
                            <StyledChatInputAreaPreview>
                                {preview && (
                                    <img src={preview} alt="preview img" />
                                )}
                            </StyledChatInputAreaPreview>
                        </StyledChatInputAreaView>
                    </StyledChatInputArea>
                </StyledChat>
            </StyledTransaction>
        </StyledContent>
    )
}

export default Transaction