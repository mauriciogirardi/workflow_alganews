import { transparentize } from "polished";
import styled from "styled-components";

export const Container = styled.div`
    border: 1px solid ${transparentize(0.9, '#274060')};
    text-align: center;
    border-radius: 4px;
    padding: 1.2rem;
    overflow: hidden;
`

export const Title = styled.div`
    margin-bottom: 2rem;
`
