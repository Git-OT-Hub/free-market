import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { success, failure } from "../../store/reducers/flashMessage";
import http from "../../lib/axios";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Link from "../../components/Link/Link";
import { StyledContent, StyledFormDiv, StyledLink } from "./StyledLogin";
import type { UserInformationError } from "../../types/stateType";

const HTTP_OK = 200;
const HTTP_UNPROCESSABLE_ENTITY = 422;

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<UserInformationError>({
        email: [],
        password: [],
    });

    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // フラッシュメッセージ
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

    const login = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        try {
            const data = {
                email: email,
                password: password,
            };

            http.get('/sanctum/csrf-cookie').then(() => {
                http.post('/api/login', data).then((res) => {
                    if (res.status === HTTP_OK) {
                        http.get('/api/user').then((res) => {
                            if (!res.data.email_verified_at) {
                                return navigate("/email-verify", { state: {type: 'failure', text: 'メール認証を完了してください。'}, replace: true });
                            }

                            navigate("/", { state: {type: 'success', text: 'ログインしました'}, replace: true });
                        }).catch(() => {
                            alert('ログインに失敗しました');
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
            alert('ログインに失敗しました');
        }
    };

    return (
        <StyledContent>
            <h1>ログイン</h1>
            <form onSubmit={login}>
                <Input
                    label="メールアドレス"
                    errorKey="email"
                    errors={errors}
                    type="email"
                    value={email}
                    fn={useCallback((e) => setEmail(e.target.value), [])}
                />
                <Input
                    label="パスワード"
                    errorKey="password"
                    errors={errors}
                    type="password"
                    value={password}
                    fn={useCallback((e) => setPassword(e.target.value), [])}
                />
                <StyledFormDiv>
                    <Button
                        label="ログインする"
                    />
                </StyledFormDiv>
            </form>
            <StyledLink>
                <Link
                    to="/register"
                    text="会員登録はこちら"
                    $color="#0873cc"
                />
            </StyledLink>
        </StyledContent>
    );
};

export default Login;