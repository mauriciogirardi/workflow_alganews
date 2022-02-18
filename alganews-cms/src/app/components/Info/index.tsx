import * as S from './styles'
import { MdInfo, MdHighlightOff, MdOutlineTaskAlt } from 'react-icons/md'

const statusIcons = {
    error: <MdHighlightOff />,
    info: <MdInfo />,
    success: <MdOutlineTaskAlt />
}

interface InfoProps {
    title: string
    description: string
    status?: 'error' | 'info' | 'success'
}

export const Info = ({ title, description, status = 'info' }: InfoProps) => {
    return (
        <S.Wrapper>
            <S.InfoInnerContent>
                <S.InfoIcon colorInfo={status}>
                    {statusIcons[status]}
                </S.InfoIcon>

                <S.InfoMessages>
                    <S.InfoTitle>{title}</S.InfoTitle>
                    <p>{description}</p>
                </S.InfoMessages>
            </S.InfoInnerContent>

        </S.Wrapper>
    )
}
