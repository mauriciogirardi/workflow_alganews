import { transparentize } from "polished";
import styled from "styled-components";

export const Container = styled.div`
    color: #274060;
    text-align: center;
    padding: 1.5rem;
    border: 1px solid  ${transparentize(0.9, '#274060')};

    > h1 {
        font-size: 1.2rem;
        font-weight: 500;
    }

    > p {
        margin-top: 0.5rem;
        font-size: 0.7rem;
        font-family: 'Roboto Mono', sans-serif;
    }
`
