import styled from "styled-components";

export const Anchor = styled.a`
    color: #274060;
    text-decoration: none;
    font-size: 13px;
    transition: color .25s ease;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    &:hover,
    &:focus {
        color: #09f;
    }
`
