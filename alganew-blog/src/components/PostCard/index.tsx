import { Post } from "mauricio.girardi-sdk"
import Link from "next/link"

import * as S from './styles'

interface PostCardProps {
    post: Post.Summary
}

export const PostCard = ({ post }: PostCardProps) => {
    return (
        <Link href={`/posts/${post.id}/${post.slug}`} passHref>
            <S.Wrapper>
                <S.Thumbnail bg={post.imageUrls.small} />
                <S.Info>
                    <S.Editor>
                        <S.EditorImage
                            src={post.editor.avatarUrls.small}
                            width={64}
                            height={64}
                            objectFit="cover"
                        />
                    </S.Editor>

                    <S.PublishDate>ha 3 dias</S.PublishDate>
                    <S.Title>{post.title}</S.Title>
                </S.Info>
            </S.Wrapper>
        </Link>
    )
}
