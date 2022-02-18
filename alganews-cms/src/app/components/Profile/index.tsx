import * as S from './styles'

type ProfileProps = {
    name: string
    description: string
    url: string
    editorId: number
}

export const Profile = ({ description, name, url, editorId }: ProfileProps) => {
    return (
        <S.Wrapper to={`/editores/${editorId}`}>
            <S.Image src={url} alt={name} />

            <S.WrapperContent>
                <p>{name}</p>
                <span>{description}</span>
            </S.WrapperContent>
        </S.Wrapper>
    )
}
