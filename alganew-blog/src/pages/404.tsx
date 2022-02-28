import Image from 'next/image'
import * as S from '../styles/NotFoundStyles'
import notFoundSvg from '../../public/not-found.svg'
import Link from 'next/link'

export default function NotFound() {
    return (
        <S.Wrapper>
            <Image
                src={notFoundSvg}
                width={300}
                height={300}
                objectFit="contain"
                alt="não encontrado"
            />
            <a className='copyright' href="https://storyset.com/web" target="_blank" rel="noreferrer">Web illustrations by Storyset</a>
            <h2>Página não encontrado!</h2>

            <Link href="/" passHref>
                <a>Voltar para  Home</a>
            </Link>
        </S.Wrapper>
    )
}
