import * as S from './styles'

interface ValueDescriptorProps {
    isCurrency?: boolean;
    description: string;
    value: number;
    color?: 'primary' | 'default'
}

export const ValueDescriptor = ({
    isCurrency = false,
    description,
    value,
    color = 'default',
}: ValueDescriptorProps) => {
    return (
        <S.Container  >
            <span>{description}:</span>
            <S.Wrapper color={color} isCurrency={isCurrency}>
                {isCurrency && <span>{'R$'}</span>}

                <span>{value.toLocaleString('pt-br')}</span>
            </S.Wrapper>
        </S.Container>
    )
}
