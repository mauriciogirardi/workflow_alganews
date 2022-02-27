import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    background-color: ${({ theme }) => theme.primaryBackground};
    border-radius: ${({ theme }) => theme.borderRadius};
    color: ${({ theme }) => theme.primaryForeground};
    min-height: 16rem;
    padding: 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
`

export const BgImage = styled.div<{ bg: string }>`
    background-image: url(${({ bg }) => bg});
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0.05;
`

export const Content = styled.div`
    position: relative;
    gap: 1.5rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    z-index: 1;
`

export const Tags = styled.ul`
    list-style: none;
    display: flex;
    gap: 0.5rem;
`

export const Tag = styled.li`
    background-color: ${({ theme }) => theme.activeElementBackground};
    color: ${({ theme }) => theme.activeElementForeground};
    border-radius: ${({ theme }) => theme.borderRadius};
    text-transform: lowercase;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: default;
`

export const Editor = styled.div`
    display: flex;
    gap: 1rem;
`

export const EditorDescription = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`

export const PostDate = styled.p`
    font-size: 0.75rem;
`

export const EditorName = styled.p`
    font-size: 0.875rem;
    font-weight: 700;
`

export const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
`
