import { transparentize } from "polished";
import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
`;

export const Thumbnail = styled.div`
    height: 256px;
    width: 100%;
    border-top-left-radius: ${(p) => p.theme.borderRadius};
    border-top-right-radius: ${(p) => p.theme.borderRadius};
    overflow: hidden;
    object-fit: cover;
    img {
        height: 100%;
        object-fit: cover;
    }
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    height: 0;
    bottom: -32px;
    gap: 1rem;

    @media screen and (max-width: 767px) {
        height: 256px;
    }
`;

export const Editor = styled.div`
    position: relative;
    border-radius: 32px;
    width: 64px;
    height: 64px;
    box-shadow: 0 0 0 4px ${(p) => p.theme.pageBackground};
    img {
        border-radius: 32px;
    }
`;
export const PublishDate = styled.p`
    color: ${(p) => transparentize(0.5, p.theme.pageForeground)};
    font-size: 12px;
`;

export const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 600;

    @media screen and (max-width: 767px) {
        font-size: 1.5rem;
    }
`;
