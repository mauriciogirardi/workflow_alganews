import { transparentize } from "polished";
import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid ${transparentize(0.9, '#274060')};
    padding: 1rem;
    color: #274060;
    border-radius: 4px;

    span {
        font-size: 12px;
    }
`

export const Image = styled.img`
    width: 48px;
    height: 48px;
    object-fit: cover;
`

export const Name = styled.h2`
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`
