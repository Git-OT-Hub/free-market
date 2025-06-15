import styled from "styled-components";
import { memo } from "react";

export const StyledButton = memo(styled.button`
    display: block;
    width: 100%;
    height: 40px;
    background: #fb5555;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
`);