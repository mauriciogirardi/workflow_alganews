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
    justify-content: flex-end;
    margin-top: 12px;
    ul {
        display: flex;
        list-style: none;
        gap: 4px;
        li {
        &.selected {
            a {
            background-color: rgb(0, 153, 255);
            color: rgb(243, 248, 250);
            pointer-events: none;
            }
        }
        a {
            transition: 0.25s ease;
            outline: none;
            background-color: rgb(243, 248, 250);
            color: rgb(39, 64, 96);
            border: 1px solid rgba(39, 64, 96, 0.1);
            border-radius: 4px;
            min-width: 28px;
            height: 28px;
            padding: 0px 6px;
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            cursor: pointer;
            &:hover,
            &:focus {
            box-shadow: 0 6px 6px rgba(0, 0, 0, 0.15);
            transform: translateY(-3px);
            }
        }
        &.disabled a {
            pointer-events: none;
            opacity: 0.5;
            outline: none;
        }
        }
    }
`
