import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { success, failure } from "../../store/reducers/flashMessage";
import { StyledContent, StyledButton } from "./StyledEmailVerify";
import Link from "../../components/Link/Link";
import http from "../../lib/axios";
import type { AppDispatch } from "../../store/store";

const HTTP_ACCEPTED = 202;
const HTTP_NO_CONTENT = 204;
const VERIFIED = "1";

const EmailVerify: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

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

    // メール認証完了時の処理
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const isVerified = params.get("verified");

        if (isVerified === VERIFIED) {
            dispatch(success('メール認証が完了しました。「認証はこちらから」を押して、次の画面に進んでください。'));
        }
    }, [location.search]);

    // メール認証済みかどうかを確認
    const verify = () => {
        http.get('/api/user').then((res) => {
            const user = res.data;
            if (!user.email_verified_at) {
                return dispatch(failure('メール認証を完了してください。'));
            }

            navigate("/mypage/profile", { replace: true });
        }).catch(() => {
            alert('ユーザー情報を取得できませんでした。');
        });
    };

    // 認証メールの再送
    const resendVerificationEmail = () => {
        http.get('/sanctum/csrf-cookie').then(() => {
            http.post('/email/verification-notification').then((res) => {
                if (res.status === HTTP_ACCEPTED) {
                    return dispatch(success('登録していただいたメールアドレスに認証メールを送付しました。'));
                } else if (res.status === HTTP_NO_CONTENT) {
                    return dispatch(failure('メール認証が完了しているため、認証メールは送付できません。'));
                }
            }).catch(() => {
                alert('認証メールの再送に失敗しました。');
            });
        });
    }

    return (
        <StyledContent>
            <p>登録していただいたメールアドレスに認証メールを送付しました。</p>
            <p>メール認証を完了してください。</p>
            <div>
                <StyledButton
                    onClick={verify}
                >
                    認証はこちらから
                </StyledButton>
            </div>
            <div>
                <Link
                    to=""
                    text="認証メールを再送する"
                    fn={resendVerificationEmail}
                    $color="#0873cc"
                />
            </div>
        </StyledContent>
    );
};

export default EmailVerify;