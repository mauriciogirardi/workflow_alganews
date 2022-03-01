import Link from 'next/link'
import * as S from './styles'

export const Navbar = () => {
    return (
        <S.Container>
            <ul>
                <li>
                    <Link href="/" passHref>
                        <a>Home</a>
                    </Link>
                </li>
            </ul>
        </S.Container>
    )
}
