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
        margin-top: 40px;
    }
`);

export const StyledFormDiv = memo(styled.div`
    margin-top: 80px;
`);
