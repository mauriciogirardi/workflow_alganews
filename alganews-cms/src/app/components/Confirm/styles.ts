import styled from 'styled-components'

export const Wrapper = styled.div`
    padding: 1.4rem;
    background-color: #f3f8fa;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
    width: 229px;
    border-radius: 4px;
`

export const Title = styled.h2`
    font-size: 18px;
    color: #274060;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    overflow: hidden;
`

export const WrapperButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
`
