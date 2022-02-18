import { Button } from '../Button'
import * as S from './styles'

type SessionControllerProps = {
    name: string
    description: string
    url: string
    onLogout?: () => void
}

export const SessionController = ({ description, name, url, onLogout }: SessionControllerProps) => {
    return (
        <S.Wrapper>
            <S.Image src={url} alt={name} />

            <S.Name>{name}</S.Name>
            <span>{description}</span>

            <Button variant='danger' label='Logout' onClick={onLogout} />
        </S.Wrapper>
    )
}
