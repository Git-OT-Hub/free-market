import { memo } from "react";
import styled from "styled-components";

export const StyledLoading = memo(styled.div`
    p {
        width: 50%;
        margin: 30% auto;
        text-align: center;
        font-weight: bold;
        font-size: 40px;
    }
`);