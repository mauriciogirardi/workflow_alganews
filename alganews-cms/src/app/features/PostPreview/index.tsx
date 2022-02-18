import { useEffect, useState } from "react"
import { PostService, Post } from "mauricio.girardi-sdk"
import Skeleton from "react-loading-skeleton"

import { MarkdownEditor } from "app/components/MarkdownEditor"
import { withBoundary } from "core/hoc/withBoundary"
import { confirm } from "core/utils/confirm"
import { Button } from "app/components/Button"
import { info } from "core/utils/info"

import modal from "core/utils/modal"

import * as S from './styles'

type PostPreviewProps = {
    postId: number
}

function PostPreview({ postId }: PostPreviewProps) {
    const [post, setPost] = useState<Post.Detailed>()
    const [error, setError] = useState<Error>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        PostService
            .getExistingPost(postId)
            .then(setPost)
            .catch(err => setError(new Error(err.message)))
            .finally(() => setLoading(false))
    }, [postId])

    const publishPost = async () => {
        await PostService.publishExistingPost(postId)
        info({
            title: 'Post publicado',
            description: 'Você publicou o post com sucesso',
            status: 'success',
        })
    }

    const reopenModal = () => {
        modal({
            children: <PostPreview postId={postId} />
        })
    }

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
                                title: 'Publicar o post?',
                                onConfirm: publishPost,
                                onCancel: reopenModal,
                            })
                        }}
                    />
                    <Button
                        label="Editar"
                        disabled={post.published}
                        onClick={() => window.location.pathname = `/posts/editar/${postId}`}
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
