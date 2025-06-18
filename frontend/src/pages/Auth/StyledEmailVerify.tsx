import { memo } from "react";
import styled from "styled-components";

export const StyledContent = memo(styled.div`
    width: 50%;
    margin: 100px auto;
    text-align: center;

    p {
        font-weight: bold;
        margin: 0;
    }
`);

export const StyledButton = memo(styled.button`
    margin: 40px 0;
    width: 50%;
    height: 40px;
    background: #d9d9d9;
    color: #1c1c1c;
    font-weight: bold;
    border: 1px solid #1c1c1c;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
`);