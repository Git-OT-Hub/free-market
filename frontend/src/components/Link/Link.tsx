import { memo } from "react";
import { StyledLink } from "./StyledLink";

type LinkProps = {
    to: string,
    text: string,
    fn?: () => void,
};

const Link: React.FC<LinkProps> = ({to, text, fn}) => {

    return (
        <StyledLink
            to={to}
            onClick={fn}
        >
            {text}
        </StyledLink>
    );
};

export default memo(Link);