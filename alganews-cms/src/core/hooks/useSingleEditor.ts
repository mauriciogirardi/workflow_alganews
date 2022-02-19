import { User, UserService } from "mauricio.girardi-sdk"
import { useCallback, useState } from "react"

export const useSingleEditor = () => {
    const [error, setError] = useState<Error>()
    const [editor, setEditor] = useState<User.EditorDetailed>()

    const fetchEditor = useCallback(async (editorId: number) => {
        UserService
            .getExistingEditor(editorId)
            .then(setEditor)
            .catch(err => setError(new Error(err.message)))
    }, [])

    return {
        fetchEditor,
        editor,
        error
    }
}
