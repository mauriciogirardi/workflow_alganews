import { useParams } from "react-router-dom"

import { DefaultLayout } from "app/layouts/Default"
import { usePageTitle } from "core/hooks/usePageTitle"
import { PostForm } from "app/features/PostForm"

export const PostEditView = () => {
    const params = useParams<{ id: string }>()

    usePageTitle(params ? 'Edição de post' : 'Novo post')

    console.log(params)

    return (
        <DefaultLayout>
            <PostForm postId={Number(params.id)} />
        </DefaultLayout>
    )
}
