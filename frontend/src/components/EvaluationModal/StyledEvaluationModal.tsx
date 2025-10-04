import { memo } from "react";
import styled from "styled-components";

export const StyledMask = memo(styled.div`
    background: rgba(133, 131, 131, 0.4);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 7;
`);

export const StyledModal = memo(styled.div`
    background: #fdfce6;
    width: 70%;
    border-radius: 4px;
    border: 1px solid #000;
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 8;
`);

export const StyledForm = memo(styled.form`
    h2 {
        margin: 0;
        border-bottom: 1px solid #000;
        padding: 20px;
    }

    p {
        color: #868686;
        margin: 0;
        padding: 20px;
    }
`);

export const StyledEvaluationBtnArea = memo(styled.div`
    padding: 0 20px 20px 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #000;
`);

export const StyledSubmitBtnArea = memo(styled.div`
    padding: 20px;
    display: flex;
    justify-content: end;

    button {
        background: #fc8282;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        font-size: 16px;
    }
`);