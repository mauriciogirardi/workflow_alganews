import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

import { editorReducer } from './editorStore';
import { postReducer } from './postsStore';
import { userReducer } from './userSlice';

export const store = configureStore({
    reducer: {
        post: postReducer,
        editors: editorReducer,
        auth: authReducer,
        users: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
