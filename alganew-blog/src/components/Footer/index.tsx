import Logo from 'components/Logo'
import * as S from './styles'

export const Footer = () => {
    return (
        <S.Wrapper>
            <S.Container>
                <Logo />
                <span>todos os direitos reservados</span>
            </S.Container>
        </S.Wrapper>
    )
}
