import { memo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

type StyledButLinkProps = {
    $color: string,
    $background: string,
    $padding: string,
    $borderRadius: string,
}

export const StyledHeader = memo(styled.header`
    background: #000000;
    height: 60px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
        color: #fff;
        font-size: 20px;
    }
`);

export const StyledImg = memo(styled.div`
    width: 25%;

    img {
        width: 100%;
    }
`);

export const StyledAnotherImg = memo(styled.div`
    flex: 1;

    img {
        width: 100%;
    }
`);

export const StyledSearch = memo(styled.div`
    flex: 2;
    margin: 0 40px;

    input {
        display: block;
        width: 100%;
        height: 40px;
        font-size: 20px;
        padding: 5px;
    }
`);

export const StyledNav = memo(styled.div`
    flex: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0 8%;
`);

export const StyledButLink = memo(styled(Link)<StyledButLinkProps>`
    text-decoration: none;
    color: ${({ $color }) => $color};
    background: ${({ $background }) => $background};
    padding: ${({ $padding }) => $padding};
    border-radius: ${({ $borderRadius }) => $borderRadius};
`);