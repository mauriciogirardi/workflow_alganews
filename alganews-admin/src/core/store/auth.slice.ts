import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from 'auth/Authorization.service';
import { User, UserService } from 'mauricio.girardi-sdk';

type PA<T> = PayloadAction<T>;

interface AuthState {
  user: User.Detailed | null;
  fetching: boolean;
}

const initialState: AuthState = {
  user: null,
  fetching: false,
};

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (userId: number, { rejectWithValue, dispatch }) => {
    try {
      const user = await UserService.getDetailedUser(userId);

      if (user.role === 'EDITOR') {
        window.alert('Você não tem acesso a este sistema');
        AuthService.imperativelySendToLogout();
        return;
      }

      return dispatch(storeUser(user));
    } catch (err) {
      if (typeof err === 'object') {
        return rejectWithValue({ ...err });
      }
    }
  },
);

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    storeUser(state, actions: PA<User.Detailed>) {
      state.user = actions.payload;
    },

    clearUser(state) {
      state.user = null;
    },
  },
});

export const { storeUser, clearUser } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
