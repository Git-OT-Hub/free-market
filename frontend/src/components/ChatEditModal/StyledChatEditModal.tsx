import { memo } from "react";
import styled from "styled-components";

export const StyledMask = memo(styled.div`
    background: rgba(133, 131, 131, 0.4);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 4;
`);

export const StyledModal = memo(styled.div`
    background: #fff;
    width: 90%;
    padding: 20px;
    border-radius: 4px;
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 5;
`);

export const StyledChatInputAreaForm = memo(styled.form`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
    gap: 0 12px;
`);

export const StyledChatInputAreaText = memo(styled.div`
    flex: 5;
    display: flex;
    align-items: center;

    textarea {
        width: 100%;
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
    margin-bottom: 16px;
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
        display: block;
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

export const StyledCancelEdit = memo(styled.div`
    text-align: center;

    button {
        color: #5f5f5f;
        background: #d9d9d9;
        border: none;
        border-radius: 4px;
        font-size: 20px;
        padding: 8px 16px;
        cursor: pointer;
    }
`);