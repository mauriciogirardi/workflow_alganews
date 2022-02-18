import styled from "styled-components";

export const Nav = styled.nav`
    ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 12px;

        li {
            a {
                color: #274060;
                font-size: 1.1rem;
                text-decoration: none;
                transition: all 0.2s;

                :hover {
                    color: #0099FF;
                }


            }
        }

        .active {
            color: #0099FF;
            font-weight: 700;

        }
    }

`
