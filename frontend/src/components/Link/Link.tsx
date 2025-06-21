import { memo } from "react";
import { StyledLink } from "./StyledLink";

type LinkProps = {
    to: string,
    text: string,
    $color: string,
    fn?: () => void,
};

const Link: React.FC<LinkProps> = ({to, text, $color, fn}) => {

    return (
        <StyledLink
            to={to}
            onClick={fn}
            $color={$color}
        >
            {text}
        </StyledLink>
    );
};

export default memo(Link);