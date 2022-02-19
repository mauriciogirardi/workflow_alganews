import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react"

import { RootState } from "core/store"
import * as EditorActions from '../store/editorStore'

export const useEditors = () => {
    const dispatch = useDispatch()

    const loading = useSelector((state: RootState) => state.editors.fetching)
    const editorsList = useSelector((state: RootState) => state.editors.editorsList)

    const fetchAllEditors = useCallback(async () => {
        dispatch(EditorActions.fetchAllEditors())
    }, [dispatch])

    return {
        loading,
        editorsList,
        fetchAllEditors
    }
}
