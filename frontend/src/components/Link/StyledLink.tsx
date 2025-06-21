import styled from "styled-components";
import { Link } from "react-router-dom";
import { memo } from "react";

type StyledLinkProps = {
    $color: string,
}

export const StyledLink = memo(styled(Link)<StyledLinkProps>`
    text-decoration: none;
    color: ${({ $color }) => $color};
`);