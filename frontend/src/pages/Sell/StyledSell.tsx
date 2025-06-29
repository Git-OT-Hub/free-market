import { memo } from "react";
import styled from "styled-components";

type StyledImageLabelProps = {
    $isPreview: boolean,
}

type StyledCategoryLabelProps = {
    $isChecked: boolean,
}

export const StyledContent = memo(styled.div`
    width: 50%;
    margin: 60px auto;

    h1 {
        margin: 0;
        text-align: center;
    }

    form {
        margin-top: 30px;
    }
`);

export const StyledImage = memo(styled.div`
    margin-bottom: 40px;

    p {
        font-weight: bold;
        font-size: 20px;
        margin: 0 0 4px 0;
    }
`);

export const StyledImageRectangle = memo(styled.div`
    border: 2px dashed #5f5f5f;
    border-radius: 4px;

    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
    }
`);

export const StyledNoImage = memo(styled.div`
    width: 100%;
    height: 200px;
`);

export const StyledImageLabel = memo(styled.div<StyledImageLabelProps>`
    position: ${({ $isPreview }) => $isPreview ? 'relative' : ''};
    width: ${({ $isPreview }) => $isPreview ? '100%' : ''};
    height: ${({ $isPreview }) => $isPreview ? '200px' : ''};
    margin-top: ${({ $isPreview }) => $isPreview ? '' : '4px'};

    label {
        display: inline-block;
        width: 140px;
        cursor: pointer;
        border: 2px solid #fb5555;
        border-radius: 8px;
        padding: 8px 12px;
        color: #fb5555;
        font-weight: bold;

        position: ${({ $isPreview }) => $isPreview ? 'absolute' : ''};
        top: ${({ $isPreview }) => $isPreview ? '50%' : ''};
        left: ${({ $isPreview }) => $isPreview ? '50%' : ''};
        transform: ${({ $isPreview }) => $isPreview ? 'translate(-50%, -50%)' : ''};

        input {
            width: 100%;
            display: none;
        }
    }
`);

export const StyledImageError = memo(styled.div`
    margin-top: 4px;

    p {
        color: #fb5555;
        font-size: 14px;
        font-weight: bold;
        margin: 0;
    }

    ul {
        margin: 0;

        li {
            color: #fb5555;
            font-size: 14px;
            font-weight: bold;
        }
    }
`);

export const StyledItemDetails = memo(styled.div`
    margin-bottom: 40px;

    h2 {
        color: #5f5f5f;
        border-bottom: 1px solid #5f5f5f;
    }
`);

export const StyledCategoryLabel = memo(styled.label<StyledCategoryLabelProps>`
    display: inline-block;
    cursor: pointer;
    border: 2px solid #fb5555;
    border-radius: 40px;
    padding: 4px 16px;
    color: ${({ $isChecked }) => $isChecked ? '#fff' : '#fb5555'};
    font-weight: bold;
    margin: 0 20px 20px 0;
    background: ${({ $isChecked }) => $isChecked ? '#fb5555' : ''};

    input {
        display: none;
    }
`);

export const StyledSelect = memo(styled.div`
    select {
        appearance: base-select;
        width: 100%;
        height: 40px;
        line-height: 30px;
        border-radius: 4px;
        color: #5f5f5f;
        cursor: pointer;

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

export const StyledNameAndDescription = memo(styled.div`
    h2 {
        color: #5f5f5f;
        border-bottom: 1px solid #5f5f5f;
    }
`);

export const StyledTextarea = memo(styled.div`
    margin-top: 20px;

    p {
        margin: 0 0 4px 0;
        font-weight: bold;
    }

    textarea {
        width: 100%;
        padding: 4px;
        font-size: 16px;
    }
`);

export const StyledFormDiv = memo(styled.div`
    margin-top: 80px;
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