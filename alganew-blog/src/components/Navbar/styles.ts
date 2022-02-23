import styled from "styled-components";

export const Container = styled.nav`
    ul {
        display: flex;
        list-style: none;
        gap: 8px;

        a {
            color: ${p => p.theme.pageForeground};
            text-decoration: none;
            text-transform: lowercase;
            transition: color .25s ease;

            :hover {
                color: ${p => p.theme.primaryBackground}
            }
        }
    }
`
