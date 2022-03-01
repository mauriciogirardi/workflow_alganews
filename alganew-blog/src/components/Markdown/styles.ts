import styled from "styled-components";

export const Container = styled.main`
    .markdownRenderer {
        max-width: 680px;
        margin: 48px auto;

        > * {
            &:not(:last-child) {
                margin-bottom: 24px;
            }
        }

        p {
            font-size: 18px;
            line-height: 36px;
        }

        ul {
            font-size: 18px;
            line-height: 36px;
            margin-left: 32px;
        }

        h2 {
            font-size: 48px;
            font-weight: 500;
        }

        h3 {
            font-size: 36px;
            font-weight: 500;
        }

        h4,h5,h6 {
            font-size: 24px;
            font-weight: 500;
        }

        a {
            color: ${({ theme }) => theme.primaryBackground};
            text-decoration: none;
            transition: .25s ease;

            &:hover, &:focus {
                text-decoration: underline;
            }
        }


        code:not([class^='language']) {
            font-family: 'Roboto Mono', monospace;
            font-weight: 300;
            font-size: 14px;
            padding: 4px 8px;
            white-space: nowrap;
        }

        pre > code {
            white-space: inherit !important;
            display: inline-block;
        }

        pre {
            color: ${({ theme }) => theme.pageBackground};
            background-color: ${({ theme }) => theme.pageForeground};
            border-radius: ${({ theme }) => theme.borderRadius};
            overflow-x: auto;
        }

        img {
            max-width: 100%;
        }
    }
`
