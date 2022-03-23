import { configureStore, isRejected } from '@reduxjs/toolkit';

import { notification } from 'core/utils/notification';
import paymentReducer from './payment.slice';
import userReducer from './userReducer';

const observeActions = () => (next: any) => (action: any) => {
  if (isRejected(action)) {
    notification({
      type: 'error',
      title: 'Erro Observado',
      description: action.error.message || 'Erro no servidor',
    });
  }

  next(action);
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    payment: paymentReducer,
  },
  middleware: function (getDefaultMiddleware) {
    return getDefaultMiddleware().concat(observeActions);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
