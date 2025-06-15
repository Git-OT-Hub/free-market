import styled from "styled-components";
import { Link } from "react-router-dom";
import { memo } from "react";

export const StyledLink = memo(styled(Link)`
    text-decoration: none;
    color: #0873cc;
`);