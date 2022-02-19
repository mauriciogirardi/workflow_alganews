import { RootState } from "core/store"
import { Post } from "mauricio.girardi-sdk"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import * as PostActions from '../store/postsStore'

export const usePosts = () => {
    const dispatch = useDispatch()

    const paginatedPosts = useSelector((state: RootState) => state.post.paginated)
    const loading = useSelector((state: RootState) => state.post.fetching)

    const fetchingPosts = useCallback(async (query: Post.Query) => {
        dispatch(PostActions.fetchPosts(query))
    }, [dispatch])

    return {
        paginatedPosts,
        fetchingPosts,
        loading,
    }
}
