import { ReactNode } from 'react'
import * as S from './styles'

interface ContentProps {
    children: ReactNode
}

export const Content = ({ children }: ContentProps) => {
    return (
        <S.Wrapper>
            <S.Container>
                {children}
            </S.Container>
        </S.Wrapper>
    )
}
