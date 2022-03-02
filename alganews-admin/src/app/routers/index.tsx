import { Route, Routes } from 'react-router-dom';

import {
  EXPENSES,
  HOME,
  PAYMENTS,
  PAYMENTS_CREATE,
  REVENUES,
  USERS,
  USERS_CREATE,
} from '../../core/constants-paths';
import CashFlowExpensesPage from '../pages/CashFlowExpensesPage';
import CashFlowRevenuesPage from '../pages/CashFlowRevenuesPage';
import PaymentCreatePage from '../pages/PaymentCreatePage';
import PaymentListPage from '../pages/PaymentListPage';
import UserCreatePage from '../pages/UserCreatePage';
import UserListPage from '../pages/UserListPage';
import HomePage from '../pages/HomePage';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path={HOME} element={<HomePage />} />
      <Route
        path={EXPENSES}
        element={<CashFlowExpensesPage />}
      />
      <Route
        path={REVENUES}
        element={<CashFlowRevenuesPage />}
      />
      <Route
        path={PAYMENTS_CREATE}
        element={<PaymentCreatePage />}
      />
      <Route
        path={PAYMENTS}
        element={<PaymentListPage />}
      />
      <Route
        path={USERS_CREATE}
        element={<UserCreatePage />}
      />
      <Route path={USERS} element={<UserListPage />} />
    </Routes>
  );
};
