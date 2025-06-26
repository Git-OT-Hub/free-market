import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import http from "../../lib/axios";
import Link from "../Link/Link";
import { StyledHeader, StyledImg, StyledAnotherImg, StyledSearch, StyledNav, StyledButLink } from "./StyledHeader";

const HTTP_NO_CONTENT = 204;

const Header: React.FC = () => {
    const authAndLocation = useSelector((state: RootState) => state.authAndLocation);

    const isLogoOnlyPage = authAndLocation.location === "/login" || authAndLocation.location === "/register" || authAndLocation.location === "/email-verify";

    const navigate = useNavigate();

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
                    <img src="/images/logo/logo.svg" alt="" />
                </StyledImg>
            </StyledHeader>
        );
    }

    if (!authAndLocation.loading && !isLogoOnlyPage) {
        return (
            <StyledHeader>
                <StyledAnotherImg>
                    <img src="/images/logo/logo.svg" alt="" />
                </StyledAnotherImg>
                <StyledSearch>
                    <form>
                        <input
                            type="text"
                            placeholder="なにをお探しですか？"
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