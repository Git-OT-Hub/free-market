import { memo } from "react";
import styled from "styled-components";

type StyledRecommendationProps = {
    $isRecommendation: boolean,
}

type StyledMyListProps = {
    $isMyList: boolean,
}

export const StyledHeader = memo(styled.div`
    border-bottom: 1px solid #5f5f5f;
    height: 60px;
    display: flex;
    justify-content: start;
    align-items: end;
`);

export const StyledRecommendation = memo(styled.div<StyledRecommendationProps>`
    width: 25%;
    text-align: center;

    span {
        cursor: pointer;
        color: ${({ $isRecommendation }) => $isRecommendation ? '#fb2020' : ''};
    }
`);

export const StyledMyList = memo(styled.div<StyledMyListProps>`
    width: 25%;
    text-align: center;

    span {
        cursor: pointer;
        color: ${({ $isMyList }) => $isMyList ? '#fb2020' : ''};
    }
`);