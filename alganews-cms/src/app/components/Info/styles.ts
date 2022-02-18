import { transparentize } from 'polished'
import styled from 'styled-components'

const COLOR_STATUS_ICON = {
    error: '#c44c4c',
    info: '#0099FF',
    success: '#33c43a',
}

export const Wrapper = styled.div`
    padding: 1.4rem;
    background-color: #f3f8fa;
    display: flex;
    justify-content: center;
    min-width: 300px;
    max-width: 370px;
    border-radius: 4px;
    align-items: center;
    border: 1px solid ${transparentize(0.9, '#274060')};
`
export const InfoInnerContent = styled.div`
    display: flex;
    width: 100%;
    color: #274060;
    gap: 24px;
`

export const InfoIcon = styled.div<{
    colorInfo?: 'error' | 'info' | 'success'
}>`
    > svg {
        font-size: 32px;
        color: ${props => COLOR_STATUS_ICON[props.colorInfo || 'info']};
    }
`

export const InfoMessages = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const InfoTitle = styled.h2`
    font-size: 24px;
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    overflow: hidden;
`
