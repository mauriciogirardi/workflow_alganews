import { useNavigate } from 'react-router-dom'

import { Button } from 'app/components/Button'
import notFoundSvg from 'assets/not_found.svg'

import * as S from './styles'

export const NotFound404 = () => {
    const navigate = useNavigate()

    return (
        <S.NotFound404Wrapper>
            <h1>Opps!</h1>
            <h2>Não encontramos esta página</h2>
            <img src={notFoundSvg} alt="Não página encontrado" />

            <Button
                variant='primary'
                label='Ir para a home'
                onClick={() => navigate("/")}
            />
        </S.NotFound404Wrapper>
    )
}
