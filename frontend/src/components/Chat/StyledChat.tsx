import { memo } from "react";
import styled from "styled-components";

type StyledContentProps = {
    $alignItems: string;
}

type StyledUserInfProps = {
    $flexDirection: string;
}

export const StyledContent = memo(styled.div<StyledContentProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: ${({ $alignItems }) => $alignItems};
`);

export const StyledUserInf = memo(styled.div<StyledUserInfProps>`
    display: flex;
    align-items: center;
    gap: 0 12px;
    width: 45%;
    flex-direction: ${({ $flexDirection }) => $flexDirection};

    img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    span {
        font-weight: bold;
    }
`);

export const StyledNoUserImg = memo(styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #d9d9d9;
`);

export const StyledMessage = memo(styled.div`
    width: 45%;
    background: #d9d9d9;
    border-radius: 4px;
    margin-top: 4px;
    padding: 12px;
    white-space: pre-wrap;
`);

export const StyledImg = memo(styled.div`
    width: 45%;

    img {
        width: 100%;
        border-radius: 4px;
        margin-top: 4px;
    }
`);

export const StyledBtnArea = memo(styled.div`
    width: 45%;
    display: flex;
    justify-content: end;
    margin-top: 4px;
    padding-right: 12px;
    gap: 0 20px;

    span {
        cursor: pointer;
        color: #5f5f5f;
    }
`);