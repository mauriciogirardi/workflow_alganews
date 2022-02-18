import styled from 'styled-components'
import { transparentize } from 'polished'

const COLORS = {
    red: '#F84735',
    primary: '#0099FF',
    foreground: '#274060'
}

const THEME = {
    danger: {
        bg: COLORS.red,
        color: '#FFFFFF',
        onHover: 'box-shadow 0 3px 6px rgba(0,0,0,.2);',
        disabled: {
            color: COLORS.red,
            bg: transparentize(0.75, COLORS.red)
        }
    },
    primary: {
        bg: COLORS.primary,
        color: '#FFFFFF',
        onHover: 'box-shadow 0 3px 6px rgba(0,0,0,.2);',
        disabled: {
            color: '#FFFFFF',
            bg: transparentize(0.44, COLORS.primary)
        }
    },
    text: {
        bg: 'transparent',
        color: COLORS.foreground,
        onHover: `border-color: ${COLORS.foreground};`,
        disabled: {
            color: COLORS.foreground,
            bg: transparentize(0.56, COLORS.foreground)
        }
    }
}


export const Wrapper = styled.button<{
    variant: 'danger' | 'text' | 'primary'
}>`
    border: 1px solid ${p => THEME[p.variant].bg};
    background-color: ${p => THEME[p.variant].bg};
    color: ${p => THEME[p.variant].color};
    padding: 4px 8px;
    border-radius: 2px;
    transition: all 0.2s;
    cursor: pointer;

    &:hover,
    &:focus {
        ${p => THEME[p.variant].onHover}
    }

    &:disabled {
        background-color: ${p => THEME[p.variant].disabled.bg};
        color: ${p => THEME[p.variant].disabled.color};
        border-color: transparent;
        box-shadow: none;
        cursor: not-allowed;
        opacity: 0.5;
    }
`
