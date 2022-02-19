import { DefaultLayout } from "app/layouts/Default"
import { usePageTitle } from "core/hooks/usePageTitle"
import { PostForm } from "app/features/PostForm"

export const PostEditView = () => {
    usePageTitle('Edição de post')

    return (
        <DefaultLayout>
            <PostForm />
        </DefaultLayout>
    )
}
