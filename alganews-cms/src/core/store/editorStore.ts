import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { User, UserService } from 'mauricio.girardi-sdk';
import { getThunkStatus } from './getThunkStatus';

interface EditorStoreState {
    editorsList: User.EditorSummary[];
    fetching: boolean;
}

const initialState: EditorStoreState = {
    fetching: false,
    editorsList: [],
};

export const fetchAllEditors = createAsyncThunk(
    'editor/fetchAllEditor',
    async () => {
        return UserService.getAllEditors();
    },
);

export const editorReducer = createReducer(initialState, builder => {
    const { error, loading, success } = getThunkStatus([fetchAllEditors]);

    builder
        .addCase(fetchAllEditors.fulfilled, (state, action) => {
            state.editorsList = action.payload;
        })
        .addMatcher(loading, state => {
            state.fetching = true;
        })
        .addMatcher(error, state => {
            state.fetching = false;
        })
        .addMatcher(success, state => {
            state.fetching = false;
        });
});
