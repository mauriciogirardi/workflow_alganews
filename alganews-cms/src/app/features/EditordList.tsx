import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { dateFormatDistance } from 'core/utils/dateFormatDistance'
import { withBoundary } from 'core/hoc/withBoundary'
import { useEditors } from 'core/hooks/useEditors'
import { Profile } from 'app/components/Profile'

import * as S from './styles'

function EditorsList() {
    const { editorsList, loading, fetchAllEditors } = useEditors()
    const [error, setError] = useState<Error>()

    useEffect(() => {
        fetchAllEditors()
            .catch(err => setError(new Error(err.message)))
    }, [fetchAllEditors])

    if (error) throw error
    if (!editorsList.length) {
        return (
            <S.EditorsListWrapper>
                <Skeleton width={318} height={82} />
                <Skeleton width={318} height={82} />
                <Skeleton width={318} height={82} />
            </S.EditorsListWrapper>
        )
    }

    return (
        <S.EditorsListWrapper>
            {editorsList.map(editor => (
                <Profile
                    key={editor.id}
                    editorId={editor.id}
                    name={editor.name}
                    description={`Editor há ${dateFormatDistance(editor.createdAt)}`}
                    url={editor.avatarUrls.small}
                    loading={loading}
                />
            ))}
        </S.EditorsListWrapper>
    )
}

export default withBoundary(EditorsList, 'lista de editores')
