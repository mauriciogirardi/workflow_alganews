import { useEffect } from "react"
import Skeleton from "react-loading-skeleton"

import { MarkdownEditor } from "app/components/MarkdownEditor"
import { useSinglePost } from "core/hooks/useSinglePost"
import { withBoundary } from "core/hoc/withBoundary"
import { confirm } from "core/utils/confirm"
import { Button } from "app/components/Button"

import modal from "core/utils/modal"

import * as S from './styles'

type PostPreviewProps = {
    postId: number
}

function PostPreview({ postId }: PostPreviewProps) {
    const { error, post, loading, fetchPost, publishPost } = useSinglePost()

    const reopenModal = () => {
        modal({
            children: <PostPreview postId={postId} />
        })
    }

    useEffect(() => {
        fetchPost(postId)
    }, [postId, fetchPost])

    if (error) throw error
    if (!post || loading) {
        return (
            <S.PostPreviewWrapper>
                <S.PostPreviewHeader>
                    <Skeleton width={322} height={22} />
                    <S.PostPreviewWrapperButtons>
                        <Skeleton width={66} height={25} />
                        <Skeleton width={52} height={25} />
                    </S.PostPreviewWrapperButtons>
                </S.PostPreviewHeader>
                <Skeleton width={601} height={240} />
                <Skeleton width={601} height={300} />
            </S.PostPreviewWrapper>
        )
    }

    return (
        <S.PostPreviewWrapper>
            <S.PostPreviewHeader>
                <h1>{post.title}</h1>

                <S.PostPreviewWrapperButtons>
                    <Button
                        variant="danger"
                        label="Publicar"
                        disabled={post.published}
                        onClick={() => {
                            confirm({
                                title: 'Deseja publicar o post?',
                                onConfirm: () => publishPost(postId),
                                onCancel: reopenModal,
                            })
                        }}
                    />
                    <Button
                        label="Editar"
                        disabled={post.published}
                        onClick={() => (window.location.pathname = `/posts/editar/${postId}`)}
                    />
                </S.PostPreviewWrapperButtons>
            </S.PostPreviewHeader>

            <S.PostPreviewImage
                src={post.imageUrls.medium}
            />

            <MarkdownEditor
                readyOnly
                value={post.body}
            />
        </S.PostPreviewWrapper>
    )
}

export default withBoundary(PostPreview, 'post preview')
