import styled from "styled-components";
import { memo } from "react";

export const StyledInput = memo(styled.div`
    margin-top: 20px;

    label {
        font-weight: bold;
    }

    span {
        display: block;
    }

    ul {
        margin: 5px 0;

        li {
            color: #fb5555;
            font-size: 14px;
        }
    }

    input {
        display: block;
        width: 100%;
        height: 40px;
        font-size: 20px;
        padding: 5px;
    }
`);