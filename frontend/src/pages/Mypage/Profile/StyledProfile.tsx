import { memo } from "react";
import styled from "styled-components";

export const StyledContent = memo(styled.div`
    width: 50%;
    margin: 60px auto;

    h1 {
        margin: 0;
        text-align: center;
    }

    form {
        margin: 30px 0 20px 0;
    }
`);

export const StyledImage = memo(styled.div`
    display: flex;
    align-items: center;
    gap: 0 40px;
    margin-bottom: 40px;
`);

export const StyledImageCircle = memo(styled.div`
    flex: 1;

    div {
        img {
            width: 140px;
            height: 140px;
            border-radius: 50%;
        }
    }
`);

export const StyledNoImage = memo(styled.div`
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: #d9d9d9;
`);

export const StyledImageLabel = memo(styled.div`
    flex: 2;

    label {
        display: inline-block;
        width: 140px;
        cursor: pointer;
        border: 2px solid #fb5555;
        border-radius: 8px;
        padding: 8px 12px;
        color: #fb5555;
        font-weight: bold;

        input {
            width: 100%;
            display: none;
        }
    }

    p {
        width: 100%;
        color: #fb5555;
        font-size: 14px;
    }

    li {
        color: #fb5555;
        font-size: 14px;
    }
`);

export const StyledFormDiv = memo(styled.div`
    margin-top: 40px;
`);
