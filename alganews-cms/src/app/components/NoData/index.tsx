import { FaRegFrown } from 'react-icons/fa'

import * as S from './styles'

interface NoDataProps {
    title?: string
    height?: number
    bg?: string
}

export const NoData = ({
    title = "Sem dados para exibir!",
    height = 120,
    bg = '#fff'
}: NoDataProps) => {
    return (
        <S.Wrapper height={height} bg={bg}>
            <S.Title>{title} </S.Title>
            <FaRegFrown />
        </S.Wrapper>
    )
}
