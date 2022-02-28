import { transparentize } from "polished";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: flex-end;

    .pagination {
        display: flex;
        align-items: center;
        list-style: none;
        gap: 4px;

        li {
            a {
                font-weight: 600;
                text-decoration: none;
                padding: 0 8px;
                min-width: 28px;
                height: 34px;
                transition: .25s ease;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: ${({ theme }) => theme.inactiveElementBackground};
                color: ${({ theme }) => theme.inactiveElementForeground};
                border-radius: ${({ theme }) => theme.borderRadius};
                font-size: 13px;
            }

            &.disabled a {
                cursor: not-allowed;
                opacity: ${({ theme }) => theme.inactiveElementOpacity};
            }

            &.selected a {
                background-color: ${({ theme }) => theme.primaryBackground};
                color: ${({ theme }) => theme.primaryForeground};

                &:before {
                    content: 'Página';
                    margin-right: 5px;
                }
            }

            &:not(.selected, .disabled) {
                &:hover, &:focus {
                    a {
                        transform: translateY(-3px);
                        box-shadow: 0 3px 6px ${({ theme }) => transparentize(0.9, theme.pageForeground)};
                    }
                }
            }
        }

    }
`
