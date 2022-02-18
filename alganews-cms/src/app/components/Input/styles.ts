import styled from 'styled-components'
import { transparentize } from 'polished'

export const Wrapper = styled.label`
    display: flex;
    flex-direction: column;
    height: 3.5rem;
    justify-content: space-between;

    > span {
        color: #274060;
        font-weight: 600;
        font-size: 0.9rem;
    }

    > input {
        background-color: #F3F8FA;
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid #274060;
        color: #274060;
        padding-right: 1rem;
        padding-bottom: 6px;
        height: 1.5rem;
        font-size: 1rem;
        font-weight: 500;
        outline: 0;

        &::placeholder {
            color: ${transparentize(0.5, '#274060')}
        }
    }
`
