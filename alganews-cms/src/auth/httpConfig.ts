import axios from 'axios';
import { Service } from 'mauricio.girardi-sdk/dist/Service';
import { AuthService } from './Authorization.service';

const { REACT_APP_API_BASE_URL } = process.env;

if (REACT_APP_API_BASE_URL) Service.setBaseUrl(REACT_APP_API_BASE_URL);

Service.setRequestInterceptors({
    onFulfilled: async request => {
        const accessToken = AuthService.getAccessToken();

        if (accessToken && request.headers) {
            request.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return request;
    },
});

Service.setResponseInterceptors({
    onFulfilled: response => response,
    onRejected: async error => {
        // Retrieve request information
        const originalRequest = error.config;

        // If the error is authentication and the retry has not yet been done
        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Retrieving code verifier and refresh token
            const storage = {
                codeVerifier: AuthService.getCodeVerifier(),
                refreshToken: AuthService.getRefreshToken(),
            };

            // If one does not exist, it is not possible to renew the token
            const { codeVerifier, refreshToken } = storage;

            if (!refreshToken || !codeVerifier) {
                AuthService.imperativelySendToLogout();
                return;
            }

            // Renew the token
            const tokens = await AuthService.getNewToken({
                codeVerifier,
                refreshToken,
            });

            // Store p tokens for new requests
            AuthService.setAccessToken(tokens.access_token);
            AuthService.setRefreshToken(tokens.refresh_token);

            // Implement the token in the request
            originalRequest.headers[
                'Authorization'
            ] = `Bearer ${tokens.access_token}`;

            //Return a new axios call with this request
            return axios(originalRequest);
        }

        throw error;
    },
});
