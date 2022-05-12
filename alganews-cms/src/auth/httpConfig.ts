import axios from 'axios';
import { Service } from 'mauricio.girardi-sdk/dist/Service';
import { AuthService } from './Authorization.service';

const { REACT_APP_API_BASE_URL } = process.env;

if (REACT_APP_API_BASE_URL) Service.setBaseUrl(REACT_APP_API_BASE_URL);

Service.setRequestInterceptors({
    onFulfilled: async request => {
        const accessToken = AuthService.getAccessToken();

        // injeta o token de acesso na requisição
        if (accessToken && request.headers) {
            request.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return request;
    },
});

// for multiple requests
let isRefreshing: boolean = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

Service.setResponseInterceptors({
    onFulfilled: response => response,
    onRejected: async error => {
        // recupera informações da requisição
        const originalRequest = error.config;

        // caso o erro seja de autenticação e ainda não foi feito o retry
        if (error?.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] =
                            'Bearer ' + token;
                        return axios(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            // recupera o code verifier e o refresh token
            const storage = {
                codeVerifier: AuthService.getCodeVerifier(),
                refreshToken: AuthService.getRefreshToken(),
            };

            const { codeVerifier, refreshToken } = storage;

            // caso algum não exista, não é possível renovar o token
            if (!refreshToken || !codeVerifier) {
                AuthService.imperativelySendToLogout();
                return;
            }

            try {
                // renova o token
                const tokens = await AuthService.getNewToken({
                    codeVerifier,
                    refreshToken,
                });

                // armazena os tokens para novas requisições
                AuthService.setAccessToken(tokens.access_token);
                AuthService.setRefreshToken(tokens.refresh_token);

                // implementa o token na requisição
                originalRequest.headers[
                    'Authorization'
                ] = `Bearer ${tokens.access_token}`;

                processQueue(null, tokens.access_token);

                // retorna uma nova chamada do axios com essa requisição
                return axios(originalRequest);
            } catch (err) {
                processQueue(err, null);
                throw err;
            } finally {
                isRefreshing = false;
            }
        }

        throw error;
    },
});
