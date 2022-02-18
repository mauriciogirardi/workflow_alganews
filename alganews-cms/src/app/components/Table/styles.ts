import { transparentize } from "polished";
import styled, { keyframes } from "styled-components";

const pop = keyframes`
  from {
        opacity: 0;
    } to {
        opacity: 1;
    }
`

export const TableContainer = styled.table`
    background-color: ${transparentize(0.95, '#274060')};
    color: #274060;
    width: 100%;
    animation: .25s ${pop} ease;
`

export const THead = styled.thead`
    background-color: ${transparentize(0.85, '#274060')};
`
export const TrHeading = styled.tr``

export const Th = styled.th`
    height: 2rem;
    font-size: 14px;
    padding: 0 8px;
`
export const TBody = styled.tbody``

export const TrBody = styled.tr``

export const Td = styled.td`
    height: 2.5rem;
    font-size: 12px;
    font-weight: 500;
    padding: 0 8px;
`

export const Pagination = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
    justify-content: flex-end;

    > ul {
        display: flex;
        list-style: none;
        gap: 8px;

        li {
            &.selected a,
            &.disabled a {
                background-color: #ccc;
                color: #222;
                pointer-events: none;
            }

            a {
                text-align: center;
                cursor: pointer;
                background-color: #09f;
                color: #fff;
                padding: 4px 8px;
                border-radius: 4px;
                display: block;
                transition: .25s ease;

                &:hover, &:focus {
                    box-shadow:  0 6px 6px rgba(0,0,0,0.15);
                    transform:  translateY(-3px);
                }

            }
        }
    }
`
