import { memo } from "react";
import styled from "styled-components";

export const StyledContent = memo(styled.div`
    padding: 40px 32px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    @media (max-width: 850px) {
        gap: 40px;
    }
`);