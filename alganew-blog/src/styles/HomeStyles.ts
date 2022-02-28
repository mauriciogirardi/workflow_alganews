import styled from "styled-components";

export const PostGrid = styled.div`
    display: grid;
    gap: 1rem;

    @media screen and (min-width: 767px) {
        grid-template-columns: repeat(3, 1fr);
    }
`
export const PageGrid = styled.main`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
