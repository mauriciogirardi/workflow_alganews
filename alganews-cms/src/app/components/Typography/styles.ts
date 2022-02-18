import styled from 'styled-components'

const SIZE_PARAGRAPH = {
    default: {
        fs: '14px',
        lh: '25px'
    },
    small: {
        fs: '12px',
        lh: '20px'
    },
}

export const Heading1 = styled.h1`
    font-weight: 900;
    color: #274060;
    font-size: 2.2rem;
`

export const Heading2 = styled.h2`
    font-weight: 900;
    color: #274060;
    font-size: 1.5rem;
`

export const Heading3 = styled.h3`
    font-weight: 900;
    color: #274060;
    font-size: 1.1rem;
`

export const ContaiterParagraph = styled.p<{
    size: 'default' | 'small'
}>`
    line-height: ${p => SIZE_PARAGRAPH[p.size].lh};
    font-size: ${p => SIZE_PARAGRAPH[p.size].fs};
    color: #274060;
`
