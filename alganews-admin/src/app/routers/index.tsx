import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  EXPENSES,
  HOME,
  PAYMENTS,
  PAYMENTS_CREATE,
  REVENUES,
  USERS,
  USER_CREATE,
  USER_EDIT,
} from '../../core/constants-paths';
import { notification } from 'core/utils/notification';

import CashFlowExpensesPage from '../pages/CashFlowExpensesPage';
import CashFlowRevenuesPage from '../pages/CashFlowRevenuesPage';
import PaymentCreatePage from '../pages/PaymentCreatePage';
import PaymentListPage from '../pages/PaymentListPage';
import UserCreatePage from '../pages/user/UserCreatePage';
import UserListPage from '../pages/user/UserListPage';
import UserEditPage from 'app/pages/user/UserEditPage';
import HomePage from '../pages/HomePage';
import CustomError from 'mauricio.girardi-sdk/dist/CustomError';

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
              reason.data?.detail ||
              'Erro desconhecido tente mais tarde.',
          });
        }
      } else {
        notification({
          type: 'error',
          title: 'Houve um error',
          description:
            'Erro ao criar um usuário tente novamente.',
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
      <Route path={USERS} element={<UserListPage />} />
      <Route
        path={USER_CREATE}
        element={<UserCreatePage />}
      />

      <Route path={USER_EDIT} element={<UserEditPage />} />
    </Routes>
  );
};
