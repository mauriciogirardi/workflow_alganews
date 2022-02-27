import { transparentize } from "polished";
import styled from "styled-components";
import { FOOTER_HEIGHT } from "../../../_constants";

export const Wrapper = styled.footer`
    background-color: ${({ theme }) => theme.activeElementBackground};
    color: ${({ theme }) => theme.activeElementForeground};
    width: 100%;
    height: ${FOOTER_HEIGHT}px;
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    max-width: 52.5rem;
    margin: auto;
    height: 100%;
    padding: 0 1rem;

    > span {
        font-size: 1.1rem;
        color: ${({ theme }) => transparentize(0.6, theme.activeElementForeground)};
    }
`
