import EditorProfile from "app/features/EditorProfile"
import { DefaultLayout } from "app/layouts/Default"
import { usePageTitle } from "core/hooks/usePageTitle"

export const EditorProfileView = () => {
    usePageTitle('Perfil do editor')

    return (
        <DefaultLayout>
            <EditorProfile hidePersonalData />
        </DefaultLayout>
    )
}
