import { configureStore, isRejected, combineReducers } from '@reduxjs/toolkit';

import { notification } from 'core/utils/notification';
import expenseReducer from './cashFlow/expense.slice';
import revenueReducer from './cashFlow/revenue.slice';
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

const cashFlowReducer = combineReducers({
  expense: expenseReducer,
  revenue: revenueReducer,
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    payment: paymentReducer,
    cashFlow: cashFlowReducer,
  },
  middleware: function (getDefaultMiddleware) {
    return getDefaultMiddleware().concat(observeActions);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
