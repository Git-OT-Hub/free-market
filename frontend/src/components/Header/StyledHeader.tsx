import { memo } from "react";
import styled from "styled-components";

export const StyledHeader = memo(styled.header`
    background: #000000;
    height: 60px;
    padding: 10px;
    display: flex;
    align-items: center;
`);

export const StyledImg = memo(styled.div`
    width: 25%;

    img {
        width: 100%;
    }
`);