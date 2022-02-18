import { DefaultLayout } from "app/layouts/Default"
import { usePageTitle } from "core/hooks/usePageTitle"

import EditorsList from "app/features/EditordList"

export const EditorsListView = () => {
    usePageTitle('Editores')

    return (
        <DefaultLayout>
            <EditorsList />
        </DefaultLayout>
    )
}
