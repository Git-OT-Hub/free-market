import { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledContent = memo(styled.div`
    flex: 1;
    display: flex;
`);

type StyledNoImgProps = {
    $width: string;
    $height: string;
}

export const StyledOtherTransactions = memo(styled.div`
    background: #868686;
    padding: 8px 16px;
    width: 20%;

    h2 {
        color: #fff;
        margin: 0 0 40px 0;
        text-align: center;
    }
`);

export const StyledOtherTransaction = memo(styled(Link)`
    display: block;
    color: #000;
    text-decoration: none;
    font-weight: bold;
    background: #eeefeb;
    text-align: center;
    border-radius: 4px;
    width: 100%;
    padding: 4px 12px;
    margin-top: 28px;
`);

export const StyledTransaction = memo(styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
`);

export const StyledTradingPartner = memo(styled.div`
    flex: 1;
    padding: 8px 16px;
    border-bottom: 2px solid #5f5f5f;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        cursor: pointer;
        background: #fc8282;
        color: #fff;
        font-weight: bold;
        border: none;
        border-radius: 16px;
        padding: 8px 12px;
        height: 40px;
    }
`);

export const StyledTradingPartnerInf = memo(styled.div`
    display: flex;
    align-items: center;
    gap: 0 12px;

    img {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    h2 {
        margin: 0;
    }
`);

export const StyledNoImg = memo(styled.div<StyledNoImgProps>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    border-radius: 50%;
    background: #d9d9d9;
`);

export const StyledItem = memo(styled.div`
    flex: 2;
    display: flex;
    border-bottom: 2px solid #5f5f5f;
    padding: 8px 16px;
    gap: 0 16px;
`);

export const StyledItemImg = memo(styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 100px;
        border-radius: 4px;
    }
`);

export const StyledItemText = memo(styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px 0;

    h2 {
        margin: 0;
    }

    p {
        margin: 0;
    }

    span {
        font-size: 24px;
        margin: 0 4px 0 4px;
    }
`);

export const StyledChat = memo(styled.div`
    flex: 10;
    display: flex;
    flex-direction: column;
`);

export const StyledChatMessages = memo(styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 8px 16px;
    width: 100%;
`);

export const StyledChatInputArea = memo(styled.div`
    position: sticky;
    bottom: 0;
    margin-top: auto;
    z-index: 2;
    background: #fff;
`);

export const StyledChatInputAreaForm = memo(styled.form`
    display: flex;
    align-items: center;
    padding: 16px;
    width: 100%;
    gap: 0 12px;
`);

export const StyledScrollArea = memo(styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px 0;
`);

export const StyledChatInputAreaText = memo(styled.div`
    flex: 5;
    display: flex;
    align-items: center;

    textarea {
        width: 100%;
        max-height: 160px;
        resize: none;
        overflow-y: auto;
        padding: 8px;
        box-sizing: border-box;
        font-size: 16px;
    }
`);

export const StyledChatInputAreaFile = memo(styled.div`
    flex: 2;
    text-align: center;

    label {
        display: inline-block;
        cursor: pointer;
        border: 2px solid #fb5555;
        border-radius: 8px;
        padding: 8px 12px;
        color: #fb5555;
        font-weight: bold;
        height: 52px;
        line-height: 30px;

        input {
            display: none;
        }
    }
`);

export const StyledChatInputAreaSubmit = memo(styled.div`
    flex: 1;
    text-align: center;
`);

export const StyledChatInputAreaView = memo(styled.div`
    padding: 0 16px 16px 16px;
    display: flex;
    gap: 0 12px;
`);

export const StyledChatInputAreaError = memo(styled.div`
    flex: 2;

    p {
        margin: 0;
        margin-bottom: 4px;
        width: 100%;
        color: #fb5555;
        font-size: 14px;
        font-weight: bold;
    }
`);

export const StyledChatInputAreaPreview = memo(styled.div`
    flex: 1;

    img {
        width: 100%;
        border-radius: 4px;
    }
`);

export const StyledChatInputAreaImgDelete = memo(styled.div`
    text-align: end;
    margin-top: 8px;

    span {
        padding-right: 16px;
        cursor: pointer;
        color: #fb5555;
        font-weight: bold;
    }
`);