import {
  configureStore,
  isRejected,
} from '@reduxjs/toolkit';

import { notification } from 'core/utils/notification';
import userReducer from './userReducer';

const observeActions =
  () => (next: any) => (action: any) => {
    if (isRejected(action)) {
      notification({
        type: 'error',
        title: 'Error',
        description:
          action.error.message || 'Erro no servidor',
      });
    }

    next(action);
  };

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: function (getDefaultMiddlewares) {
    return getDefaultMiddlewares().concat(observeActions);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
