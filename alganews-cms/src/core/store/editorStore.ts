import { createAsyncThunk, createReducer, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { User, UserService } from "mauricio.girardi-sdk";

interface EditorStoreState {
    editorsList: User.EditorSummary[]
    fetching: boolean
}

const initialState: EditorStoreState = {
    fetching: false,
    editorsList: [],
}

export const fetchAllEditors = createAsyncThunk('editor/fetchAllEditor', async () => {
    return UserService.getAllEditors()
})

export const editorReducer = createReducer(initialState, builder => {
    const pending = isPending(fetchAllEditors)
    const rejected = isRejected(fetchAllEditors)
    const fulfilled = isFulfilled(fetchAllEditors)

    builder
        .addCase(fetchAllEditors.fulfilled, (state, action) => {
            state.editorsList = action.payload
        })
        .addMatcher(pending, state => { state.fetching = true })
        .addMatcher(fulfilled, state => { state.fetching = false })
        .addMatcher(rejected, state => { state.fetching = false })
})
