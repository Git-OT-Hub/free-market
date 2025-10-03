import { StyledContent, StyledOtherTransactions, StyledTransaction, StyledTradingPartner, StyledItem, StyledItemImg, StyledItemText, StyledChat, StyledChatMessages, StyledChatInputArea, StyledChatInputAreaText, StyledChatInputAreaFile, StyledChatInputAreaSubmit, StyledChatInputAreaForm, StyledChatInputAreaView, StyledChatInputAreaPreview, StyledChatInputAreaError, StyledOtherTransaction, StyledTradingPartnerInf, StyledNoImg, StyledScrollArea } from "./StyledTransaction";
import { useParams } from "react-router-dom";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useRef, useState, useEffect } from "react";
import { useSaveMessage } from "../../hooks/useSaveMessage";
import { httpMultipart } from "../../lib/axios";
import type { ValidationErrorsType, TransactionPartnerType, OtherTransactionsType, TransactionItemType, TransactionChatType } from "../../types/stateType";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import http from "../../lib/axios";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";
import ChatEditModal from "../../components/ChatEditModal/ChatEditModal";

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_FORBIDDEN = 403;
const HTTP_UNPROCESSABLE_ENTITY = 422;

const Transaction: React.FC = () => {
    const { id } = useParams();
    const userId = useSelector((state: RootState) => state.authAndLocation.userId);
    const [loading, setLoading] = useState<boolean>(true);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const [fileTypeError, setFileTypeError] = useState<string>('');
    const [image, setImage] = useState<File>();
    const [preview, setPreview] = useState<string>("");
    const [errors, setErrors] = useState<ValidationErrorsType>({
        errors: {}
    });
    const messageError = errors.errors['message'] || [];
    const imageError = errors.errors['image'] || [];
    const allErrors = [...messageError, ...imageError];
    const imageUrl = "http://localhost:80/storage/";

    // メッセージ保持
    const transactionId = id ?? "";
    const [drafts, setDrafts] = useSaveMessage<Record<string, string>>(
        `transactionDrafts_${userId}`,
        {}
    );
    const message = drafts[transactionId] || "";

    const navigate = useNavigate();

    // 取引内容の状態管理
    const [otherTransactions, setOtherTransactions] = useState<OtherTransactionsType[]>([]);
    const [partner, setPartner] = useState<TransactionPartnerType>({
        partner_name: '',
        partner_image: '',
    });
    const [transactionItem, setTransactionItem] = useState<TransactionItemType>({
        item_name: '',
        item_price: 0,
        item_image: '',
        item_seller_id: 0,
    });
    const [chats, setChats] = useState<TransactionChatType[]>([]);

    useEffect(() => {
        http.get(`/api/transaction/${id}/contents`)
            .then((res) => {
                if (res.status !== HTTP_OK) {
                    console.error('予期しないエラー: ', res.status);
                    return;
                }

                if (res.data.other_transactions) {
                    setOtherTransactions(res.data.other_transactions);
                }
                setPartner({
                    partner_name: res.data.partner_name,
                    partner_image: res.data.partner_image,
                });
                setTransactionItem({
                    item_name: res.data.item_name,
                    item_price: res.data.item_price,
                    item_image: res.data.item_image,
                    item_seller_id: res.data.item_seller_id,
                });
                if (res.data.chats) {
                    setChats(res.data.chats);
                }

                setLoading(false);
            })
            .catch((e) => {
                if (e.status === HTTP_FORBIDDEN) {
                    navigate('/mypage', { state: {type: 'failure', text: 'コンテンツが見つかりませんでした'}, replace: true });

                    return;
                }

                console.error('予期しないエラー: ', e);
            });
    }, []);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chats]);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const scrollDown = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

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
        formData.append("purchase_id", transactionId);
        formData.append("message", message);
        if (image) {
            formData.append("image", image);
        }

        httpMultipart.post('/api/transaction/chat/create', formData)
            .then((res) => {
                setErrors({errors: {}});

                if (res.status !== HTTP_CREATED) {
                    console.error('予期しないエラー: ', res.status);
                    return;
                }

                console.log(res);
                setChats((prevChats) => [...prevChats, res.data]);

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

    // チャット編集
    const [editingChat, setEditingChat] = useState<TransactionChatType | null>(null);
    const closeModal = () => {
        setEditingChat(null);
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <StyledContent>
            <StyledOtherTransactions>
                <h2>その他の取引</h2>
                {otherTransactions.map((transaction) => (
                    <StyledOtherTransaction
                        key={transaction.purchase.id}
                        to={`/transaction/${transaction.purchase.id}`}
                    >
                        {transaction.name}
                    </StyledOtherTransaction>
                ))}
            </StyledOtherTransactions>
            <StyledTransaction>
                <StyledTradingPartner>
                    <StyledTradingPartnerInf>
                        {partner.partner_image ? (
                            <img src={imageUrl + partner.partner_image} alt="partner img" />
                        ) : (
                            <StyledNoImg
                                $width="60px"
                                $height="60px"
                            ></StyledNoImg>
                        )}
                        <h2>
                            {partner.partner_name} さんとの取引画面
                        </h2>
                    </StyledTradingPartnerInf>
                    {Number(transactionItem.item_seller_id) !== Number(userId) && (
                        <button>
                            取引を完了する
                        </button>
                    )}
                </StyledTradingPartner>
                <StyledItem>
                    <StyledItemImg>
                        <img src={imageUrl + transactionItem.item_image} alt="item img" />
                    </StyledItemImg>
                    <StyledItemText>
                        <h2>{transactionItem.item_name}</h2>
                        <p>
                            ¥<span>{transactionItem.item_price}</span>(税込)
                        </p>
                    </StyledItemText>
                </StyledItem>
                <StyledChat>
                    <StyledChatMessages>
                        {chats.map((chat) => (
                            <Chat
                                key={chat.chat_id}
                                chat={chat}
                                userId={userId}
                                onEdit={(chat) => setEditingChat(chat)}
                            />
                        ))}
                        <div id="chat-end" ref={chatEndRef} />
                    </StyledChatMessages>
                    {editingChat && (
                        <ChatEditModal
                            chat={editingChat}
                            onClose={closeModal}
                        />
                    )}
                    <StyledChatInputArea>
                        <StyledChatInputAreaForm>
                            <StyledScrollArea>
                                <IconContext.Provider value={{ style: { cursor: 'pointer', fontSize: '1.8rem' } }}>
                                    <IoIosArrowDropup
                                        onClick={scrollUp}
                                    />
                                </IconContext.Provider>
                                <IconContext.Provider value={{ style: { cursor: 'pointer', fontSize: '1.8rem' } }}>
                                    <IoIosArrowDropdown
                                        onClick={scrollDown}
                                    />
                                </IconContext.Provider>
                            </StyledScrollArea>
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