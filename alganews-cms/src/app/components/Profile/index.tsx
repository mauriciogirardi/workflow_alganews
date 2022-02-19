import Skeleton from 'react-loading-skeleton'
import * as S from './styles'

type ProfileProps = {
    name: string
    description: string
    url: string
    editorId: number
    loading?: boolean
}

export const Profile = ({ description, name, url, editorId, loading = false }: ProfileProps) => {
    return (
        <S.Wrapper to={`/editores/${editorId}`}>
            {loading
                ? <Skeleton width={48} height={48} />
                : <S.Image src={url} alt={name} />
            }

            <S.WrapperContent>
                <p>{name}</p>
                <span>{description}</span>
            </S.WrapperContent>
        </S.Wrapper>
    )
}
