import { StyledContent, StyledUserInf, StyledNoUserImg, StyledMessage, StyledImg, StyledBtnArea } from "./StyledChat";
import type { TransactionChatType } from "../../types/stateType";

type ChatProps = {
    chat: TransactionChatType;
    userId: number | null;
    onEdit: (chat: TransactionChatType) => void;
}

const Chat: React.FC<ChatProps> = ({ chat, userId, onEdit }) => {
    const imageUrl = "http://localhost:80/storage/";

    const deleteChat = () => {

    };

    return (
        <>
            <StyledContent
                $alignItems={Number(userId) === Number(chat.user_id) ? 'end' : 'start'}
            >
                <StyledUserInf
                    $flexDirection={Number(userId) === Number(chat.user_id) ? 'row-reverse' : 'row'}
                >
                    {chat.user_image ? (
                        <img src={imageUrl + chat.user_image} alt="user img" />
                    ) : (
                        <StyledNoUserImg></StyledNoUserImg>
                    )}
                    <span>
                        {chat.user_name}
                    </span>
                </StyledUserInf>
                <StyledMessage>
                    {chat.chat_message}
                </StyledMessage>
                {chat.chat_image && (
                    <StyledImg>
                        <img 
                            src={imageUrl + chat.chat_image}
                            alt="img"
                            onLoad={() => {
                                const el = document.querySelector("#chat-end");
                                if (el) {
                                    el.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                        />
                    </StyledImg>
                )}
                <StyledBtnArea>
                    <span
                        onClick={() => onEdit(chat)}
                    >編集</span>
                    <span
                        onClick={deleteChat}
                    >削除</span>
                </StyledBtnArea>
            </StyledContent>
        </>
    )
}

export default Chat