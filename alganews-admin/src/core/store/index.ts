import {
  configureStore,
  isRejected,
  combineReducers,
  Middleware,
} from '@reduxjs/toolkit';

import { notification } from 'core/utils/notification';
import authReducer from './auth.slice';
import entriesCategoryReducer from './cashFlow/entriesCategory.slice';
import expenseReducer from './cashFlow/expense.slice';
import revenueReducer from './cashFlow/revenue.slice';
import paymentReducer from './payment.slice';
import uiReducer from './ui.slice';
import userReducer from './userReducer';

const observeActions: Middleware = () => (next) => (action) => {
  if (isRejected(action)) {
    const ignoredActions = [
      'cash-flow/categories/createCategory/rejected',
      'cash-flow/categories/deleteCategory/rejected',
      'cash-flow/expenses/createExpenses/rejected',
      'cash-flow/revenues/createRevenue/rejected',
      'cash-flow/revenues/updateRevenues/rejected',
      'cash-flow/expenses/updateExpenses/rejected',
      'user/getAllUsers/rejected',
    ];

    const shouldNotify = !ignoredActions.includes(action.type);

    if (shouldNotify)
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
  category: entriesCategoryReducer,
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    payment: paymentReducer,
    cashFlow: cashFlowReducer,
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: function (getDefaultMiddleware) {
    return getDefaultMiddleware().concat(observeActions);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
