import { Avatar } from '../Avatar'
import { Post } from 'mauricio.girardi-sdk'

import * as S from './styles'

interface FeaturedPostProps {
    postSummary: Post.Summary
}

export const FeaturedPost = ({ postSummary }: FeaturedPostProps) => {
    return (
        <S.Wrapper >
            <S.BgImage bg={postSummary.imageUrls.medium} />

            <S.Content>
                <S.Tags>
                    {postSummary.tags.map(tag => (
                        <S.Tag key={tag}>{tag}</S.Tag>
                    ))}
                </S.Tags>

                <S.Editor>
                    <Avatar
                        src={postSummary.editor.avatarUrls.small}
                        alt={postSummary.editor.name}
                    />
                    <S.EditorDescription>
                        <S.EditorName>por {postSummary.editor.name}</S.EditorName>
                        <S.PostDate>{postSummary.editor.createdAt}</S.PostDate>
                    </S.EditorDescription>
                </S.Editor>

                <S.Title>{postSummary.title}</S.Title>
            </S.Content>
        </S.Wrapper>
    )
}
