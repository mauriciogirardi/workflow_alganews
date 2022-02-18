import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const SVGWrapper = styled.div<{ size: number }>`
    position: relative;
    width: ${p => p.size}px;
    height: ${p => p.size}px;

    &:not(:last-child) {
        margin-bottom: 16px;
    }
`

export const Svg = styled.svg<{ size: number }>`
    transform:  rotate(90deg);
    width: ${p => p.size}px;
    height: ${p => p.size}px;
`

export const Circle = styled.circle`
    transition: stroke-dashoffset 850ms ease;
`

export const CircleBG = styled.circle.attrs({
    fill: '#F3F8FA'
})``

export const Percentage = styled.span<{
    theme: 'default' | 'primary'
}>`
    font-size: 1.2em;
    font-weight: 900;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${p => p.theme === 'primary' ? '#0099FF' : '#274060'};
    position: absolute;
    top: 0;
    left: 0;
`

export const Caption = styled.span<{
    theme: 'default' | 'primary'
}>`
    font-size: 1em;
    font-weight: 400;
    text-transform: lowercase;
    color: ${p => p.theme === 'primary' ? '#0099FF' : '#274060'};
`
