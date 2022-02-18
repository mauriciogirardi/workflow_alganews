import styled from 'styled-components'

export const Wrapper = styled.div<{
    height: number
    bg: string
}>`
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${p => p.height}px;
    background-color:  ${p => p.bg};

    > svg {
        font-size: 2rem;
        color: #09f;
    }
`

export const Title = styled.h1`
    font-size: 1.6rem;
    font-weight: 700;
    color: #274060;
`
