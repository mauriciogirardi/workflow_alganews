import styled from "styled-components";

export const Wrapper = styled.div`
    max-width: 1140px;
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
`

export const Main = styled.main`
    display: grid;
    grid-template-columns: 20% 60% 20%;
    gap: 1rem;
`

export const Navigation = styled.nav`
    display: flex;
    padding-right: 2rem;
    justify-content: flex-end;
`

export const Aside = styled.aside``

export const FeaturedContent = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-bottom: 2.2rem;
`
