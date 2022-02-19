import { useEffect } from "react"

import { MarkdownEditor } from "app/components/MarkdownEditor"
import { useSinglePost } from "core/hooks/useSinglePost"
import { withBoundary } from "core/hoc/withBoundary"
import { confirm } from "core/utils/confirm"
import { Loading } from "app/components/Loading"
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
    if (loading) return <Loading show />;
    if (!post) return null

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
