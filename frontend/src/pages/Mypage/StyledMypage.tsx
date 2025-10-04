import { memo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

type StyledHeaderExhibitListProps = {
    $isExhibitList: boolean;
}

type StyledHeaderPurchaseListProps = {
    $isPurchaseList: boolean;
}

type StyledHeaderTransactionListProps = {
    $isTransactionList: boolean;
}

export const StyledHeader = memo(styled.div`
    border-bottom: 1px solid #5f5f5f;
    padding-bottom: 8px;
    height: 60px;
    display: flex;
    justify-content: start;
    align-items: end;
`);

export const StyledHeaderExhibitList = memo(styled.div<StyledHeaderExhibitListProps>`
    width: 25%;
    text-align: center;

    span {
        cursor: pointer;
        color: ${({ $isExhibitList }) => $isExhibitList ? '#fb2020' : ''};
    }
`);

export const StyledHeaderPurchaseList = memo(styled.div<StyledHeaderPurchaseListProps>`
    width: 25%;
    text-align: center;

    span {
        cursor: pointer;
        color: ${({ $isPurchaseList }) => $isPurchaseList ? '#fb2020' : ''};
    }
`);

export const StyledHeaderTransactionList = memo(styled.div<StyledHeaderTransactionListProps>`
    width: 25%;
    text-align: center;

    span:first-of-type {
        cursor: pointer;
        color: ${({ $isTransactionList }) => $isTransactionList ? '#fb2020' : ''};
    }
`);

export const StyledProfile = memo(styled.div`
    display: flex;
    align-items: center;
    padding: 40px 32px 0 32px;
`);

export const StyledProfileInfo = memo(styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10%;
    flex: 1;
`);

export const StyledProfileBtn = memo(styled.div`
    flex: 1;
    text-align: center;
`);

export const StyledProfileImg = memo(styled.div`
    div {
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    }
`);

export const StyledProfileName = memo(styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px 0;

    span {
        font-size: 20px;
        font-weight: bold;
    }
`);

export const StyledEvaluation = memo(styled.div`
    display: flex;
    gap: 0 4px;
`);

export const StyledNoImage = memo(styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #d9d9d9;
`);

export const StyledButLink = memo(styled(Link)`
    display: inline-block;
    text-decoration: none;
    color: #fb5555;
    background: #fff;
    height: 40px;
    line-height: 40px;
    border: 1px solid #fb5555;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    padding: 0 16px;
    font-weight: bold;
`);

export const StyledTotalCount = memo(styled.span`
    margin-left: 8px;
    background: #fb5555;
    color: #fff;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 8px;
`);