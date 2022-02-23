import Logo from 'components/Logo'
import { Navbar } from 'components/Navbar'
import * as S from './styles'

export const Header = () => {
    return (
        <S.Wrapper>
            <S.Container>
                <Logo />
                <Navbar />
            </S.Container>
        </S.Wrapper>
    )
}
