import * as S from './styles'

interface FieldDescriptorProps {
    value: string;
    field: string;
}

export const FieldDescriptor = ({
    value,
    field,
}: FieldDescriptorProps) => {
    return (
        <S.Wrapper>
            <span>{field}:</span>
            <p>{value}</p>
        </S.Wrapper>
    )
}
