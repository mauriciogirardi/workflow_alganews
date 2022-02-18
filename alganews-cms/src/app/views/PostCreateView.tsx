import { DefaultLayout } from "app/layouts/Default"
import { usePageTitle } from "core/hooks/usePageTitle"
import { PostForm } from "app/features/PostForm"

export const PostCreateView = () => {
    usePageTitle('Novo post')

    return (
        <DefaultLayout>
            <PostForm />
        </DefaultLayout>
    )
}
