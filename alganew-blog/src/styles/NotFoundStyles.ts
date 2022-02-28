import { transparentize } from "polished";
import styled from "styled-components";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../_constants";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: calc(96vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);

    a:not(.copyright) {
        background-color: ${({ theme }) => theme.primaryBackground};
        color: ${({ theme }) => theme.primaryForeground};
        text-decoration: none;
        padding: 8px 12px;
        border-radius: ${({ theme }) => theme.borderRadius};
        margin-top: 20px;
        font-size: 12px;
        transition: .25s ease;

        &:hover, &:focus {
            transform: translateY(-3px);
            box-shadow: 0 3px 6px ${({ theme }) => transparentize(0.7, theme.pageForeground)};
        }
    }

    .copyright {
        text-decoration: none;
        color: #ccc;
        font-size: 10px;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
`
