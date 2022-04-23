import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, UserService } from 'mauricio.girardi-sdk';
import { getThunkStatus } from './getThunkStatus';

export const fetchEditors = createAsyncThunk(
    'user/fetchEditors',
    async function () {
        const editors = await UserService.getAllEditors();
        return editors;
    },
);

interface UserSliceState {
    editors: User.EditorSummary[];
    fetching: boolean;
}

const initialState: UserSliceState = {
    fetching: false,
    editors: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        const { error, loading, success } = getThunkStatus([fetchEditors]);

        builder
            .addMatcher(success, state => {
                state.fetching = true;
            })
            .addMatcher(error, state => {
                state.fetching = false;
            })
            .addMatcher(loading, state => {
                state.fetching = false;
            });
    },
});

export const userReducer = userSlice.reducer;
