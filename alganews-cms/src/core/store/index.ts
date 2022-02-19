import { configureStore } from "@reduxjs/toolkit"

import { editorReducer } from "./editorStore"
import { postReducer } from "./postsStore"

export const store = configureStore({
    reducer: {
        post: postReducer,
        editors: editorReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
