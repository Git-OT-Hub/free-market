import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { fetchAuth } from "../../store/reducers/authAndLocation";
import http from "../../lib/axios";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Link from "../../components/Link/Link";
import { StyledContent, StyledFormDiv, StyledLink } from "./StyledRegister";

const HTTP_CREATED = 201;
const HTTP_UNPROCESSABLE_ENTITY = 422;

export type Error = {
    name?: string[],
    email?: string[],
    password?: string[],
    password_confirmation?: string[],
}

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmed, setPasswordConfirmed] = useState<string>('');
    const [errors, setErrors] = useState<Error>({
        name: [],
        email: [],
        password: [],
        password_confirmation: [],
    });

    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // ヘッダーの切り替え
    useEffect(() => {
        dispatch(fetchAuth(location.pathname));
    }, [location.pathname]);

    const resetInput = (): void => {
        setName('');
        setEmail('');
        setPassword('');
        setPasswordConfirmed('');
        setErrors({
            name: [],
            email: [],
            password: [],
            password_confirmation: [],
        });
    };

    const register = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        try {
            const data = {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmed,
            };

            http.get('/sanctum/csrf-cookie').then(() => {
                http.post('/api/register', data).then((res) => {
                    if (res.status === HTTP_CREATED) {
                        resetInput();
                        navigate("/email-verify", { state: {type: 'success', text: 'ユーザー登録が完了しました'}, replace: true });
                    }
                }).catch((e) => {
                    if (e.response.status === HTTP_UNPROCESSABLE_ENTITY) {
                        const responseData = {...e.response.data.errors};
                        setErrors(responseData);
                    }
                });
            });
        } catch (error) {
            alert('ユーザー登録に失敗しました');
        }
    };

    return (
        <StyledContent>
            <h1>会員登録</h1>
            <form onSubmit={register}>
                <Input
                    label="ユーザー名"
                    errorKey="name"
                    errors={errors}
                    type="text"
                    value={name}
                    fn={useCallback((e) => setName(e.target.value), [])}
                />
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
                <Input
                    label="確認用パスワード"
                    errorKey="password_confirmation"
                    errors={errors}
                    type="password"
                    value={passwordConfirmed}
                    fn={useCallback((e) => setPasswordConfirmed(e.target.value), [])}
                />
                <StyledFormDiv>
                    <Button
                        label="登録する"
                    />
                </StyledFormDiv>
            </form>
            <StyledLink>
                <Link
                    to="/login"
                    text="ログインはこちら"
                    $color="#0873cc"
                />
            </StyledLink>
        </StyledContent>
    );
};

export default Register;