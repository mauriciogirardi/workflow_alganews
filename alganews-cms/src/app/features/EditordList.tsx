import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { dateFormatDistance } from 'core/utils/dateFormatDistance'
import { UserService } from 'sdk/services/UserService'
import { Profile } from 'app/components/Profile'
import { User } from 'sdk/@types'

import * as S from './styles'
import { withBoundary } from 'core/hoc/withBoundary'

function EditorsList() {
    const [error, setError] = useState<Error>()
    const [editors, setEditors] = useState<User.EditorSummary[]>([])

    useEffect(() => {
        UserService
            .getAllEditors()
            .then(setEditors)
            .catch(err => setError(new Error(err.message)))
    }, [])

    if (error) throw error
    if (!editors.length) {
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
            {editors.map(editor => (
                <Profile
                    key={editor.id}
                    editorId={editor.id}
                    name={editor.name}
                    description={`Editor há ${dateFormatDistance(editor.createdAt)}`}
                    url={editor.avatarUrls.small}
                />
            ))}
        </S.EditorsListWrapper>
    )
}

export default withBoundary(EditorsList, 'lista de editores')
