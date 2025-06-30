import { memo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
    h1 {
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

export const StyledIcons = memo(styled.div`
    margin-top: 4px;
    padding: 0 20px;
    display: flex;
    gap: 20%;
`);

export const StyledStar = memo(styled.div`
    
`);

export const StyledBubble = memo(styled.div`
    
`);

export const StyledButLink = memo(styled(Link)`
    display: block;
    width: 100%;
    text-decoration: none;
    color: #fff;
    background: #fb5555;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 16px;
`);

export const StyledDescription = memo(styled.div`
    margin-top: 20px;

    h2 {
        margin: 0;
    }

    p {
        white-space: pre-line;
    }
`);

export const StyledInformation = memo(styled.div`
    margin-top: 40px;

    h2 {
        margin: 0;
    }

    table {
        width: 100%;

        th {
            padding: 12px 16px 12px 0;
            text-align: start;
            width: 100px;
        }

        td {
            padding: 12px 0;
            text-align: start;
        }

        span {
            background-color: #d9d9d9;
            border-radius: 16px;
            padding: 4px 16px;
        }
    }
`);

export const StyledTd = memo(styled.td`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`);

