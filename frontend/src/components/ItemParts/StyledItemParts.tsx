import { memo } from "react";
import styled from "styled-components";

export const StyledContent = memo(styled.div`
    width: calc(25% - 12px);
    border-radius: 4px;
    box-shadow: 8px 8px 8px #b6b4b4;

    @media (max-width: 850px) {
        width: calc(50% - 20px);
        border-radius: 4px;
        box-shadow: 8px 8px 8px #b6b4b4;
    }
`);

export const StyledImage = memo(styled.div`
    position: relative;

    img {
        width: 100%;
        border-radius: 4px;
    }
`);

export const StyledName = memo(styled.div`
    padding: 0 8px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`);

export const StyledText = memo(styled.div`
    padding: 0 8px;
    height: 40px;
    line-height: 40px;
    text-align: end;

    span {
        font-weight: bold;
        color: #fb2020;
    }
`);

export const StyledUnreadCount = memo(styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    background: #fb5555;
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;
    border-radius: 50%;
    position: absolute;
    top: 4%;
    left: 4%;
    z-index: 2;
`);