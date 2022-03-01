import Image from 'next/image'
import Head from 'next/head'
import * as S from '../styles/NotFoundStyles'
import notInternalErrorSvg from '../../public/internal-error.svg'
import Link from 'next/link'

export default function ServerError() {
    return (
        <>
            <Head>
                <title>Erro interno - 500</title>
            </Head>

            <S.Wrapper>
                <Image
                    src={notInternalErrorSvg}
                    width={300}
                    height={300}
                    objectFit="contain"
                    alt="erro interno"
                />
                <a className='copyright' href="https://storyset.com/web" target="_blank" rel="noreferrer">Web illustrations by Storyset</a>
                <h2>Erro interno!</h2>
                <p>O estagiário desconectou um cabo errado...</p>
                <Link href="/" passHref>
                    <a>Tentar acessar a Home</a>
                </Link>
            </S.Wrapper>
        </>
    )
}
