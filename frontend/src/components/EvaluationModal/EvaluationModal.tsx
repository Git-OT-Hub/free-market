import { StyledMask, StyledModal, StyledForm, StyledEvaluationBtnArea, StyledSubmitBtnArea } from "./StyledEvaluationModal";
import { IconContext } from "react-icons";
import { IoStar } from "react-icons/io5";
import { useState } from "react";
import http from "../../lib/axios";
import { useNavigate } from "react-router-dom";

type EvaluationModalProps = {
    purchaseId: string;
};
const HTTP_CREATED = 201;

const EvaluationModal: React.FC<EvaluationModalProps> = ({ purchaseId }) => {
    const [rating, setRating] = useState<number>(0);
    const navigate = useNavigate();

    const handleEvaluation = (value: number) => {
        setRating(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            purchase_id: purchaseId,
            rating: rating,
        };

        http.post('/api/transaction/complete', data)
            .then((res) => {
                if (res.status !== HTTP_CREATED) {
                    console.error('予期しないエラー: ', res.status);
                    return;
                }

                if (res.status === HTTP_CREATED && res.data) {
                    navigate("/", { state: {type: 'success', text: '取引評価を送信しました'}, replace: true });
                }
            })
            .catch((e) => {
                console.error('予期しないエラー: ', e);
            });
    };

    return (
        <StyledMask>
            <StyledModal>
                <StyledForm
                    onSubmit={handleSubmit}
                >
                    <h2>取引が完了しました。</h2>
                    <p>今回の取引相手はどうでしたか？</p>
                    <StyledEvaluationBtnArea>
                        {[1, 2, 3, 4, 5].map((star) =>
                            star <= rating ? (
                                <IconContext.Provider
                                    key={star}
                                    value={{ style: { 
                                        cursor: 'pointer',
                                        fontSize: '5rem',
                                        color: '#fff048'
                                    } }}
                                >
                                    <IoStar
                                        onClick={() => handleEvaluation(star)}
                                    />
                                </IconContext.Provider>
                            ) : (
                                <IconContext.Provider
                                    key={star}
                                    value={{ style: { 
                                        cursor: 'pointer',
                                        fontSize: '5rem',
                                        color: '#d9d9d9'
                                    } }}
                                >
                                    <IoStar
                                        onClick={() => handleEvaluation(star)}
                                    />
                                </IconContext.Provider>
                            )
                        )}
                    </StyledEvaluationBtnArea>
                    <StyledSubmitBtnArea>
                        <button>
                            送信する
                        </button>
                    </StyledSubmitBtnArea>
                </StyledForm>
            </StyledModal>
        </StyledMask>
    )
}

export default EvaluationModal