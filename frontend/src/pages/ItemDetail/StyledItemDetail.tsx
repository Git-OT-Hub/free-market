import { memo } from "react";
import styled from "styled-components";

export const StyledContent = memo(styled.div`
    padding: 40px 32px;
    display: flex;
    gap: 10%;
`);

export const StyledImage = memo(styled.div`
    width: 50%;

    img {
        width: 100%;
        border-radius: 4px;
    }

    p {
        padding: 0 20px;
        text-align: end;
        font-size: 20px;
        color: #fb2020;
    }
`);

export const StyledDetail = memo(styled.div`
    width: 50%;
`);

export const StyledName = memo(styled.div`
    h2 {
        margin: 0;
    }
`);

export const StyledBrand = memo(styled.div`
    margin-top: 4px;

    span {
        font-size: 12px;
    }
`);

export const StyledPrice = memo(styled.div`
    margin-top: 4px;

    span {
        font-size: 24px;
    }
`);
