import { RiAlertFill } from 'react-icons/ri'

import * as S from './styles'

type ErrorDisplayProps = {
    sizeIcon?: boolean
    title?: string
    message?: string
}

export const ErrorDisplay = ({
    sizeIcon,
    message = "Erro desconhecido",
    title = "Erro ao recuperar componete"
}: ErrorDisplayProps) => {
    const size = sizeIcon ? 24 : 48

    return (
        <S.Container>
            <RiAlertFill color="#274060" size={size} />
            <h1>{title}</h1>
            <p>{message}</p>
        </S.Container>
    )
}
