import styled from "styled-components";

export const Container = styled.nav`
    ul {
        display: flex;
        list-style: none;
        gap: 0.5rem;

        a {
            color: ${({ theme }) => theme.pageForeground};
            text-decoration: none;
            text-transform: lowercase;
            transition: color .25s ease;

            :hover {
                color: ${({ theme }) => theme.primaryBackground}
            }
        }
    }
`
