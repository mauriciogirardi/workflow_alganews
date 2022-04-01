import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  EXPENSES,
  HOME,
  PAYMENTS,
  PAYMENTS_CREATE,
  PAYMENTS_DETAILS,
  REVENUES,
  USERS,
  USER_CREATE,
  USER_DETAILS,
  USER_EDIT_ID,
} from '../../core/constants-paths';
import { notification } from 'core/utils/notification';
import CustomError from 'mauricio.girardi-sdk/dist/CustomError';

import CashFlowExpensesPage from '../pages/cashFlow/CashFlowExpensesPage';
import CashFlowRevenuesPage from '../pages/cashFlow/CashFlowRevenuesPage';
import PaymentCreatePage from '../pages/payment/PaymentCreatePage';
import PaymentListPage from '../pages/payment/PaymentListPage';
import UserDetailsPage from 'app/pages/user/UserDetailsPage';
import UserCreatePage from '../pages/user/UserCreatePage';
import UserListPage from '../pages/user/UserListPage';
import UserEditPage from 'app/pages/user/UserEditPage';
import HomePage from '../pages/HomePage';
import PaymentDetailsPage from 'app/pages/payment/PaymentDetailsPage';

export const MainRoutes = () => {
  useEffect(() => {
    window.onunhandledrejection = ({ reason }) => {
      if (reason instanceof CustomError) {
        if (reason.data?.objects) {
          reason.data.objects.forEach((error) => {
            notification({
              type: 'error',
              description: error.userMessage || '',
              title: 'Error',
            });
          });
        } else {
          notification({
            type: 'error',
            title: reason.message || 'Erro',
            description:
              reason.data?.detail || 'Erro desconhecido tente mais tarde.',
          });
        }
      } else {
        notification({
          type: 'error',
          title: 'Houve um error',
          description: reason?.message || '',
        });
      }
    };

    return () => {
      window.onunhandledrejection = null;
    };
  }, []);

  return (
    <Routes>
      <Route path={HOME} element={<HomePage />} />
      <Route path={EXPENSES} element={<CashFlowExpensesPage />} />
      <Route path={REVENUES} element={<CashFlowRevenuesPage />} />

      {/* Payments */}
      <Route path={PAYMENTS} element={<PaymentListPage />} />
      <Route path={PAYMENTS_DETAILS} element={<PaymentDetailsPage />} />
      <Route path={PAYMENTS_CREATE} element={<PaymentCreatePage />} />

      {/* Users */}
      <Route path={USERS} element={<UserListPage />} />
      <Route path={USER_CREATE} element={<UserCreatePage />} />

      <Route path={USER_DETAILS} element={<UserDetailsPage />} />

      <Route path={USER_EDIT_ID} element={<UserEditPage />} />
    </Routes>
  );
};
