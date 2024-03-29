import { Post } from 'mauricio.girardi-sdk'
import Image from 'next/image'
import { formatPostDate } from 'utils/formatPostDate'
import * as S from './styles'

interface PostHeaderProps {
    thumbnail: string
    editor: Post.Detailed["editor"]
    createdAt: string
    title: string
}

export const PostHeader = ({ editor, createdAt, thumbnail, title }: PostHeaderProps) => {
    return (
        <S.Wrapper>
            <S.Thumbnail>
                <Image
                    src={thumbnail}
                    width={848}
                    height={256}
                    objectFit={"cover"}
                    alt={title}
                />
            </S.Thumbnail>
            <S.Editor>
                <Image
                    src={editor.avatarUrls.small}
                    width={64}
                    height={64}
                    objectFit={"cover"}
                    alt={editor.name}
                />
            </S.Editor>
            <S.PublishDate>{formatPostDate(createdAt)}</S.PublishDate>
            <S.Title>{title}</S.Title>
        </S.Wrapper>
    )
}
