import Image from "next/image";
import { transparentize } from "polished";
import styled from "styled-components";

export const Thumbnail = styled.div<{ bg: string }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-image: url(${({ bg }) => bg});
    background-position: center;
    background-size: cover;
    border-top-left-radius: ${({ theme }) => theme.borderRadius};
    border-top-right-radius: ${({ theme }) => theme.borderRadius};
`;

export const Info = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    height: 50%;
    width: 100%;
    z-index: 2;
    margin-top: -32px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;

export const Editor = styled.div`
    position: relative;
    z-index: 2;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.activeElementBackground};
`;

export const EditorImage = styled(Image)`
    width: 64px;
    height: 64px;
    border-radius: 50%;
`;

export const PublishDate = styled.p`
    font-size: 12px;
    color: ${({ theme }) => transparentize(0.5, theme.activeElementForeground)};
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 14px;
    padding: 0 1rem;
`;

export const Wrapper = styled.a`
    text-decoration: none;
    position: relative;
    min-height: 256px;
    background-color: ${({ theme }) => theme.activeElementBackground};
    color: ${({ theme }) => theme.activeElementForeground};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: 0 3px 6px
    ${({ theme }) => transparentize(0.9, theme.activeElementForeground)};
    transition: 0.25s ease;
    * {
        transition: 0.25s ease;
    }
    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.primaryBackground};
        box-shadow: 0 0 0 4px
        ${({ theme }) => transparentize(0.7, theme.primaryBackground)};
        outline: none;

        * {
            color: ${({ theme }) => theme.primaryForeground};
        }
        ${Thumbnail} {
            height: 100%;
            opacity: 0.1;
        }
    }
`;
