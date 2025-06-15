import { StyledHeader, StyledImg } from "./StyledHeader";

const Header: React.FC = () => {

    return (
        <StyledHeader>
            <StyledImg>
                <img src="/images/logo/logo.svg" alt="" />
            </StyledImg>
        </StyledHeader>
    );
};

export default Header;