import { Wrapper as ButtonStyles } from "../Button/styles";
import styled from "styled-components";

export const Wrapper = styled.div``

export const ImagePreview = styled.div<{ preview: string }>`
    height: 100%;
    background-image: url(${p => p.preview});
    background-position: center;
    background-size: cover;
    transition: all 0.2s;
    z-index: 10;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const ImagePreviewWrapper = styled.div`
    background-color: #274060;
    height: 240px;

    ${ButtonStyles} {
        display: none;
        transition: all 0.2s;
        cursor: pointer;
        background-color: #ccc;
        border-color: #ccc;
        color: #274060;
        font-size: 0.9rem;
    }

    &:hover {
        ${ButtonStyles} {
            display: flex;
            align-items: center;

            >svg {
                margin-left: 12px;
            }
        }

        ${ImagePreview} {
            opacity: 0.7;
        }
    }
`

export const Input = styled.input`
    display: none;
`

export const Label = styled.label`
    background-color: #09f;
    color: #fff;
    padding: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
`
