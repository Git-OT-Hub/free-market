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
    display: flex;
    flex-direction: column;
    text-align: center;
`);

export const StyledBubble = memo(styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
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

export const StyledCommentContent = memo(styled.div`
    margin-top: 40px;

    h2 {
        color: #5f5f5f;
        margin: 0;
    }
`);

export const StyledCommentArea = memo(styled.div`
    max-height: 400px;
    overflow: auto;
    padding-right: 8px;
`);

export const StyledCommentInfo = memo(styled.div`
    margin-bottom: 36px;
`);

export const StyledCommentUser = memo(styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;

    img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    div {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #d9d9d9;
    }

    span {
        font-weight: bold;
    }
`);

export const StyledComment = memo(styled.div`
    background-color: #d9d9d9;
    padding: 12px 8px;
    border-radius: 4px;

    p {
        white-space: pre-line;
        margin: 0;
    }
`);

export const StyledCommentForm = memo(styled.div`
    margin-top: 40px;

    form {
        h3 {
            margin: 0;
        }

        textarea {
            width: 100%;
            padding: 8px;
            margin-bottom: 16px;
            font-size: 16px;
        }
    }
`);

export const StyledCommentError = memo(styled.div`
    margin-bottom: 4px;

    ul {
        margin: 0;

        li {
            color: #fb5555;
            font-size: 14px;
            font-weight: bold;
        }
    }
`);