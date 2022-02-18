import { transparentize } from 'polished'
import styled from 'styled-components'

export const Container = styled.div<{
    theme?: 'primary' | 'secondary',
    width?: number
}>`
    background-color: ${transparentize(0.85, '#274060')};
    width: ${p => p.width}px;
    border-radius: 4px;
    height: 24px;
    position: relative;
    width: 100%;
`

export const Front = styled.div<{
    theme: 'primary' | 'secondary',
    progress: number,
}>`
    border-radius: 4px;
    height: 24px;
    display: flex;
    align-items: center;
    background-color: ${p => p.theme === 'primary' ? '#0099FF' : '#274060'};
    width: ${p => p.progress}%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;

    p {
        padding-left: 1rem;
        padding-bottom: 2px;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
    }
`
export const Back = styled.div`
    border-radius: 4px;
    height: 24px;
    display: flex;
    align-items: center;
    width: 100%;

    p {
        padding-left: 1rem;
        padding-bottom: 2px;
        font-size: 14px;
        font-weight: 600;
        color: #274060;
    }
`
