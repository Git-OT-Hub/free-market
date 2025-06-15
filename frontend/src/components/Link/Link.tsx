import { memo } from "react";
import { StyledLink } from "./StyledLink";

type LinkProps = {
    to: string,
    text: string,
};

const Link: React.FC<LinkProps> = ({to, text}) => {

    return (
        <StyledLink to={to}>
            {text}
        </StyledLink>
    );
};

export default memo(Link);