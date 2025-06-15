import { memo } from "react";
import styled from "styled-components";

type StyledFlashMessageProps = {
    $isSuccess: boolean,
}

export const StyledFlashMessage = memo(styled.div<StyledFlashMessageProps>`
    background: ${({ $isSuccess }) => $isSuccess ? '#76b675' : '#cc625b'};
    height: 60px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    box-shadow: 0 5px 5px #9d9c9c;

    span {
        font-size: 20px;
        color: #fff;
    }

    button {
        font-weight: bold;
        cursor: pointer;
        border: none;
        background: none;
        color: #fff;
        font-size: 28px;
    }
`);