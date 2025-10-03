import { StyledMask, StyledModal, StyledChatInputAreaForm, StyledChatInputAreaError, StyledChatInputAreaFile, StyledChatInputAreaPreview, StyledChatInputAreaSubmit, StyledChatInputAreaText, StyledChatInputAreaView, StyledChatInputAreaImgDelete, StyledCancelEdit } from "./StyledChatEditModal";
import { useState, useRef } from "react";
import type { TransactionChatType, ValidationErrorsType } from "../../types/stateType";
import { FaRegEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import { httpMultipart } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

type ChatEditModalProps = {
    chat: TransactionChatType;
    onClose: () => void;
};

const TRUE = '1';
const FALSE = '0';
const HTTP_OK = 200;
const HTTP_FORBIDDEN = 403;
const HTTP_UNPROCESSABLE_ENTITY = 422;

const ChatEditModal: React.FC<ChatEditModalProps> = ({ chat, onClose }) => {
    const imageUrl = "http://localhost:80/storage/";
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [message, setMessage] = useState(chat.chat_message);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(chat.chat_image ? `${imageUrl}${chat.chat_image}` : "");
    const [fileTypeError, setFileTypeError] = useState<string>('');
    const [errors, setErrors] = useState<ValidationErrorsType>({
        errors: {}
    });
    const messageError = errors.errors['message'] || [];
    const imageError = errors.errors['image'] || [];
    const allErrors = [...messageError, ...imageError];
    const [removeExistingImage, setRemoveExistingImage] = useState<boolean>(false);
    const navigate = useNavigate();

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
        setRemoveExistingImage(false);
    };

    const handleDeleteImg = () => {
        setImage(null);
        setPreview("");
        setFileTypeError("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        if (chat.chat_image) {
            setRemoveExistingImage(true);
        }
    };

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("chat_id", String(chat.chat_id));
        formData.append("message", message);
        if (image) {
            formData.append("image", image);
        }
        formData.append("remove_image", removeExistingImage ? TRUE : FALSE);

        httpMultipart.post('/api/transaction/chat/update', formData)
            .then((res) => {
                setErrors({errors: {}});

                if (res.status !== HTTP_OK) {
                    console.error('予期しないエラー: ', res.status);
                    return;
                }

                console.log(res);


            })
            .catch((e) => {
                if (e.response.status === HTTP_UNPROCESSABLE_ENTITY) {
                    setErrors({errors: {...e.response.data.errors}});
                    return;
                }

                if (e.status === HTTP_FORBIDDEN) {
                    navigate('/mypage', { state: {type: 'failure', text: 'コンテンツが見つかりませんでした'}, replace: true });
                    return;
                }

                console.error('予期しないエラー: ', e);
            });
    };

    return (
        <StyledMask>
            <StyledModal>
                <StyledChatInputAreaForm>
                    <StyledChatInputAreaText>
                        <textarea
                            placeholder="取引メッセージを記入してください"
                            rows={8}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </StyledChatInputAreaText>
                    <StyledChatInputAreaFile>
                        <label>
                            画像を追加
                            <input
                                type="file"
                                accept="image/jpeg, image/png"
                                onChange={handleFile}
                                ref={fileInputRef}
                            />
                        </label>
                    </StyledChatInputAreaFile>
                    <StyledChatInputAreaSubmit>
                        <IconContext.Provider value={{ style: { cursor: 'pointer', fontSize: '3rem' } }}>
                            <FaRegEdit
                                onClick={handleUpdate}
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
                            <>
                                <img src={preview} alt="preview img" />
                                <StyledChatInputAreaImgDelete>
                                    <span
                                        onClick={handleDeleteImg}
                                    >
                                        削除
                                    </span>
                                </StyledChatInputAreaImgDelete>
                            </>
                        )}
                    </StyledChatInputAreaPreview>
                </StyledChatInputAreaView>
                <StyledCancelEdit>
                    <button
                        onClick={onClose}
                    >キャンセル</button>
                </StyledCancelEdit>
            </StyledModal>
        </StyledMask>
    )
}

export default ChatEditModal