import styled, { css } from 'styled-components'

const COLOR = {
    primary: '#0099FF',
    default: '#274060',
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    > span {
        font-size: 12px;
        color: #274060;
    }
`

export const Wrapper = styled.div<{
    color: 'primary' | 'default',
    isCurrency: boolean
}>`
    font-weight: 600;
    font-weight: 18px;
    color: ${p => COLOR[p.color]};
    display: flex;

    ${p => p.isCurrency && css`
        span:first-child {
            font-weight: 500;
            margin-right: 2px;
            font-size: 12px;
        }
    `}
`
