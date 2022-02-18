import styled, { keyframes } from "styled-components";

const pop = keyframes`
  from {
        opacity: 0;
    } to {
        opacity: 1;
    }
`

export const UseTopTagsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    animation: .25s ${pop} ease;
`

export const UserEarningsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    padding-right: 2rem;
    animation: .25s ${pop} ease;
`

export const EditorsListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    animation: .25s ${pop} ease;
`

export const PostFormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
    animation: .25s ${pop} ease;
`

export const PostFormSubmitWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    animation: .25s ${pop} ease;
`
