import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'auth/Authorization.service';

import { EditorProfileView } from 'app/views/EditorProfileView';
import { EditorsListView } from 'app/views/EditorsListView';
import { PostCreateView } from 'app/views/PostCreateView';
import { NotFound404 } from 'app/views/NotFound404';
import { info } from 'core/utils/info';

import HomeView from '../views/HomeView';
import { Authentication } from 'auth/Auth';
import { useAuth } from 'core/hooks/auth/useAuth';
import { Loading } from 'app/components/Loading';

export const MainRoutes = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, fetchUser } = useAuth();

    useEffect(() => {
        window.onunhandledrejection = (error: PromiseRejectionEvent) => {
            info({
                title: error.reason.response?.data.title || 'Error',
                description:
                    error.reason.response?.data.detail || error.reason.message,
                status: 'error',
            });
        };
    }, []);

    useEffect(() => {
        async function identify() {
            const isInAuthRouter = window.location.pathname === '/authorize';
            const accessToken = AuthService.getAccessToken();

            const code = new URLSearchParams(window.location.search).get(
                'code',
            );
            const codeVerifier = AuthService.getCodeVerifier();

            if (!accessToken && !isInAuthRouter) {
                AuthService.imperativelySendToLoginScreen();
            }

            if (isInAuthRouter) {
                if (!code) {
                    info({
                        status: 'error',
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

                const redirectUri = 'http://localhost:3001/authorize';
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

                navigate('/');
            }

            if (accessToken) {
                const decodedToken: Authentication.AccessTokenDecodedBody =
                    jwtDecode(accessToken);
                fetchUser(decodedToken['alganews:user_id']);
            }
        }

        identify();
    }, [navigate, fetchUser]);

    const isAuthorizationRoute = useMemo(
        () => location.pathname === '/authorize',
        [location],
    );

    if (isAuthorizationRoute || !user) return <Loading show={!!user} />;

    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/editores" element={<EditorsListView />} />
            <Route path="/editores/:id" element={<EditorProfileView />} />
            <Route path="/posts/criar" element={<PostCreateView />} />
            <Route path="/posts/editar/:id" element={<PostCreateView />} />

            <Route path="*" element={<NotFound404 />} />
        </Routes>
    );
};
