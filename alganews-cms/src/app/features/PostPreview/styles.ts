import { transparentize } from "polished";
import styled from "styled-components";

export const PostPreviewWrapper = styled.div`
    padding: 1.4rem;
    background-color: #f3f8fa;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 665px;
    border-radius: 4px;
    border: 1px solid ${transparentize(0.9, '#274060')};
    max-height: 70vh;
    overflow-y: auto;
    box-shadow: 0 6px 6px rgba(0,0,0,.05);
`

export const PostPreviewHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    > h1 {
        font-size: 18px;
    }
`

export const PostPreviewWrapperButtons = styled.div`
    display: flex;
    gap: 1rem;
`

export const PostPreviewImage = styled.img`
    height: 240px;
    width: 100%;
    object-fit: cover;
`
