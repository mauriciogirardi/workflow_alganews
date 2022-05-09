import { lazy, useEffect, useMemo, Suspense } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CustomError from 'mauricio.girardi-sdk/dist/CustomError';
import jwtDecode from 'jwt-decode';

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
import { Authentication } from 'auth/Auth';
import { GlobalLoading } from 'app/components/GlobalLoading';
import { notification } from 'core/utils/notification';
import { AuthService } from 'auth/Authorization.service';
import { useAuth } from 'core/hooks/auth/useAuth';

const CashFlowExpensesPage = lazy(
  () => import('../pages/cashFlow/CashFlowExpensesPage'),
);
const CashFlowRevenuesPage = lazy(
  () => import('../pages/cashFlow/CashFlowRevenuesPage'),
);
const PaymentDetailsPage = lazy(
  () => import('app/pages/payment/PaymentDetailsPage'),
);
const PaymentCreatePage = lazy(
  () => import('../pages/payment/PaymentCreatePage'),
);
const PaymentListPage = lazy(() => import('../pages/payment/PaymentListPage'));
const UserDetailsPage = lazy(() => import('app/pages/user/UserDetailsPage'));
const UserCreatePage = lazy(() => import('../pages/user/UserCreatePage'));
const UserListPage = lazy(() => import('../pages/user/UserListPage'));
const UserEditPage = lazy(() => import('app/pages/user/UserEditPage'));
const HomePage = lazy(() => import('../pages/HomePage'));

export const MainRoutes = () => {
  const { user } = useAuth();
  const { fetchUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

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
        if (reason?.data?.objects) {
          return reason.data.objects.map((obj: { userMessage: string }) => {
            return notification({
              type: 'error',
              title: 'Error no formulário',
              description: obj.userMessage || '',
            });
          });
        }

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

  useEffect(() => {
    async function identify() {
      const isInAuthRouter = window.location.pathname === '/authorize';
      const accessToken = AuthService.getAccessToken();

      const code = new URLSearchParams(window.location.search).get('code');
      const codeVerifier = AuthService.getCodeVerifier();

      if (!accessToken && !isInAuthRouter) {
        AuthService.imperativelySendToLoginScreen();
      }

      if (isInAuthRouter) {
        if (!code) {
          notification({
            type: 'error',
            title: 'Erro',
            description: 'Código não foi informado!',
          });
          AuthService.imperativelySendToLoginScreen();
          return;
        }

        if (!codeVerifier) {
          AuthService.imperativelySendToLogout();
          return;
        }

        const redirectUri = `${APP_BASE_URL}/authorize`;
        const { access_token, refresh_token } =
          await AuthService.getFirstAccessToken({
            code,
            codeVerifier,
            redirectUri,
          });

        AuthService.setAccessToken(access_token);
        AuthService.setRefreshToken(refresh_token);

        const decodedToken: Authentication.AccessTokenDecodedBody =
          jwtDecode(access_token);
        fetchUser(decodedToken['alganews:user_id']);

        navigate(HOME);
      }

      if (accessToken) {
        const decodedToken: Authentication.AccessTokenDecodedBody =
          jwtDecode(accessToken);
        fetchUser(decodedToken['alganews:user_id']);
      }
    }

    identify();
  }, [navigate, fetchUser, APP_BASE_URL]);

  const isAuthorizationRoute = useMemo(
    () => location.pathname === '/authorize',
    [location],
  );

  if (isAuthorizationRoute || !user) return <GlobalLoading />;

  return (
    <Suspense fallback={<GlobalLoading />}>
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
    </Suspense>
  );
};
