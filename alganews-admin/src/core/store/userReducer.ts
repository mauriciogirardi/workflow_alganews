import { User, UserService } from 'mauricio.girardi-sdk';
import {
  createReducer,
  createAsyncThunk,
  isFulfilled,
  isRejected,
  isPending,
} from '@reduxjs/toolkit';

interface UserState {
  users: User.Summary[];
  fetching: boolean;
}

const initialState: UserState = {
  fetching: false,
  users: [],
};

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async () => UserService.getAllUsers(),
);

export const toggleUsersStatus = createAsyncThunk(
  'user/toggleUserStatus',
  async (user: User.Summary | User.Detailed) => {
    user.active
      ? await UserService.deactivateExistingUser(user.id)
      : await UserService.activateExistingUser(user.id);

    return user;
  },
);

export default createReducer(initialState, (builder) => {
  const success = isFulfilled(
    getAllUsers,
    toggleUsersStatus,
  );
  const error = isRejected(getAllUsers, toggleUsersStatus);
  const loading = isPending(getAllUsers, toggleUsersStatus);

  builder
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    })
    .addCase(
      toggleUsersStatus.fulfilled,
      (state, action) => {
        const { id } = action.payload;

        state.users = state.users.map((user) => {
          if (user.id === id) {
            return { ...user, active: !user.active };
          }
          return user;
        });
      },
    )
    .addMatcher(success, (state) => {
      state.fetching = false;
    })
    .addMatcher(error, (state) => {
      state.fetching = false;
    })
    .addMatcher(loading, (state) => {
      state.fetching = true;
    });
});
