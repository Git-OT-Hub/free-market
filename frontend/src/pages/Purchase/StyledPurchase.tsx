import { memo } from "react";
import styled from "styled-components";

export const StyledContent = memo(styled.div`
    padding: 40px 32px;
    display: flex;
    gap: 5%;
`);

export const StyledPurchaseInfo = memo(styled.div`
    flex: 2;
`);

export const StyledPurchaseReconfirmation = memo(styled.div`
    flex: 1;

    table {
        width: 100%;
        border: 1px solid #000000;

        tr {
            border: 1px solid #000000;
        }

        td {
            padding: 16px;
        }

        span {
            font-size: 24px;
        }
    }
`);

export const StyledItemInfo = memo(styled.div`
    display: flex;
    width: 100%;
    gap: 10%;
    border-bottom: 1px solid #000000;
    padding-bottom: 40px;
`);

export const StyledItemImg = memo(styled.div`
    flex: 1;

    img {
        width: 100%;
        border-radius: 4px;
    }
`);

export const StyledItemText = memo(styled.div`
    flex: 2;

    h2 {
        margin: 0 0 12px 0;
    }

    p {
        margin: 0;

        span {
            font-size: 24px;
        }
    }
`);

export const StyledPurchaseMethod = memo(styled.div`
    border-bottom: 1px solid #000000;
    padding: 20px 20px 40px 20px;

    h3 {
        margin: 0 0 20px 0;
    }

    select {
        appearance: base-select;
        width: 50%;
        height: 40px;
        line-height: 30px;
        border-radius: 4px;
        color: #5f5f5f;
        cursor: pointer;
        margin-left: 40px;

        option:checked {
            background-color: #5599eb;
            border-radius: 8px;
        }
    }

    ::picker(select) {
        appearance: base-select;
        background-color: #636769;
        color: #fff;
        border-radius: 4px;
        padding: 4px;
    }
`);

export const StyledError = memo(styled.div`
    margin-bottom: 4px;

    ul {
        margin: 0;

        li {
            color: #fb5555;
            font-size: 14px;
            font-weight: bold;
        }
    }
`);

export const StyledShippingAddress = memo(styled.div`
    border-bottom: 1px solid #000000;
    padding: 20px 20px 40px 20px;
`);

export const StyledShippingAddressHeader = memo(styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
        margin: 0;
    }
`);

export const StyledShippingAddressBody = memo(styled.div`
    padding: 20px 0 0 40px;

    p {
        margin: 0;
        font-weight: bold;
    }
`);

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
    margin-top: 40px;
`);