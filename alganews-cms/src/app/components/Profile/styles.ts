import { transparentize } from "polished";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled(Link)`
    display: flex;
    align-items: center;
    gap: 24px;
    border: 1px solid ${transparentize(0.9, '#274060')};
    cursor: pointer;
    padding: 1rem;
    transition: box-shadow .15s ease;
    text-decoration: none;
    color: #274060;
    border-radius: 4px;

    &:focus,
    &:hover {
        outline: none;
        box-shadow: 0 0 0 5px #09f;
    }
`

export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;

    p {
        font-size: 18px;
        font-weight: 600;
    }

    span {
        font-size: 12px;
    }

`

export const Image = styled.img`
    width: 48px;
    height: 48px;
    object-fit: cover;
`
