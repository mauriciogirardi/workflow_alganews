import { createAsyncThunk, createReducer, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { Post, PostService } from "mauricio.girardi-sdk";

interface PostSliceState {
    paginated?: Post.Paginated
    fetching: boolean
}

const initialState: PostSliceState = {
    fetching: false,
    paginated: {
        totalElements: 0,
        totalPages: 1,
        content: [],
        page: 0,
        size: 0,
    }
}

export const fetchPosts = createAsyncThunk('post/fetchPosts', async (query: Post.Query) => {
    const posts = await PostService.getAllPosts(query)
    return posts
})

export const postReducer = createReducer(initialState, builder => {
    builder
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.paginated = action.payload
        })
        .addMatcher(isPending, (state) => { state.fetching = true })
        .addMatcher(isFulfilled, (state) => { state.fetching = false })
        .addMatcher(isRejected, (state) => { state.fetching = false })
})
