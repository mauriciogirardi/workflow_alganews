import { Button } from '../Button'
import * as S from './styles'


interface ConfirmProps {
    title: string
    onConfirm?: () => void
    onCancel?: () => void
}

export const Confirm = ({ title, onCancel, onConfirm }: ConfirmProps) => {
    return (
        <S.Wrapper>
            <S.Title>{title}</S.Title>

            <S.WrapperButtons>
                <Button variant='danger' label={'Não'} onClick={onCancel} />
                <Button variant='primary' label={'Sim'} onClick={onConfirm} />
            </S.WrapperButtons>
        </S.Wrapper>
    )
}
