import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import type { RootState } from "../../store/store";
import http from "../../lib/axios";
import Link from "../Link/Link";
import { StyledHeader, StyledImg, StyledAnotherImg, StyledSearch, StyledNav, StyledButLink } from "./StyledHeader";

const HTTP_NO_CONTENT = 204;

const Header: React.FC = () => {
    const [text, setText] = useState<string>("");
    const authAndLocation = useSelector((state: RootState) => state.authAndLocation);

    const isLogoOnlyPage = authAndLocation.location === "/login" || authAndLocation.location === "/register" || authAndLocation.location === "/email-verify";

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        if (confirm("ログアウトしますか？")) {
            http.get('/sanctum/csrf-cookie').then(() => {
                http.post('/api/logout').then((res) => {
                    if (res.status === HTTP_NO_CONTENT) {
                        navigate('/login', { state: {type: 'success', text: 'ログアウトしました'}, replace: true });
                    }
                }).catch(() => {
                    alert('ログアウトに失敗しました');
                });
            });
        }
    };

    const searchItems = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // navigate(`/?search=${encodeURIComponent(text)}`);
        navigate(`${location.pathname}?search=${encodeURIComponent(text)}`);
    };

    if (authAndLocation.loading) {
        return (
            <StyledHeader>
                <p>Loading...</p>
            </StyledHeader>
        );
    }

    if (!authAndLocation.loading && isLogoOnlyPage) {
        return (
            <StyledHeader>
                <StyledImg>
                    <RouterLink to="/">
                        <img src="/images/logo/logo.svg" alt="" />
                    </RouterLink>
                </StyledImg>
            </StyledHeader>
        );
    }

    if (!authAndLocation.loading && !isLogoOnlyPage) {
        return (
            <StyledHeader>
                <StyledAnotherImg>
                    <RouterLink to="/">
                        <img src="/images/logo/logo.svg" alt="" />
                    </RouterLink>
                </StyledAnotherImg>
                <StyledSearch>
                    <form onSubmit={searchItems}>
                        <input
                            type="text"
                            placeholder="なにをお探しですか？"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </form>
                </StyledSearch>
                <StyledNav>
                    {authAndLocation.isAuthenticated ? (
                        <Link
                            to=""
                            text="ログアウト"
                            fn={logout}
                            $color="#fff"
                        />
                    ) : (
                        <Link
                            to="/login"
                            text="ログイン"
                            $color="#fff"
                        />
                    )}
                    <Link
                        to="/mypage"
                        text="マイページ"
                        $color="#fff"
                    />
                    <StyledButLink
                        to="/sell"
                        $color="#000000"
                        $background="#fff"
                        $padding="4px 16px"
                        $borderRadius="4px"
                    >出品</StyledButLink>
                </StyledNav>
            </StyledHeader>
        );
    }
};

export default Header;