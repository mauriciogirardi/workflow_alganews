import pkceChallenge from 'pkce-challenge';
import axios from 'axios';
import qs from 'qs';

interface GetFirstAccessTokenProps {
    code: string;
    codeVerifier: string;
    redirectUri: string;
}

interface GetNewTokenProps {
    refreshToken: string;
    codeVerifier: string;
    scope?: string;
}

export interface OAuthAuthorizationTokenResponse {
    access_token: string;
    token_type: 'bearer' | string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    [key: string]: string | number;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_BASE_URL = process.env.REACT_APP_AUTH_SERVER_BASE_URL;

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const CODE_VERIFIER = 'codeVerifier';
const CLIENT_ID = 'alganews-cms';
const PATH_OAUTH_TOKEN = '/oauth/token';
const PATH_OAUTH_AUTHORIZE = `${API_BASE_URL}/oauth/authorize`;

const authServer = axios.create({
    baseURL: API_BASE_URL,
});

authServer.interceptors.response.use(undefined, async error => {
    if (error?.response?.status === 401) {
        AuthService.imperativelySendToLogout();
    }

    return Promise.reject(error);
});

export class AuthService {
    public static imperativelySendToLogout() {
        window.localStorage.clear();
        window.location.href = `${API_BASE_URL}/logout?redirect=${BASE_URL}`;
    }

    public static async getNewToken({
        codeVerifier,
        refreshToken,
        scope,
    }: GetNewTokenProps) {
        const formUrlEncoded = qs.stringify({
            scope,
            refresh_token: refreshToken,
            code_verifier: codeVerifier,
            grant_type: 'refresh_token',
            client_id: CLIENT_ID,
        });

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        return authServer
            .post<OAuthAuthorizationTokenResponse>(
                PATH_OAUTH_TOKEN,
                formUrlEncoded,
                {
                    headers,
                },
            )
            .then(res => res.data);
    }

    public static async getFirstAccessToken({
        code,
        codeVerifier,
        redirectUri,
    }: GetFirstAccessTokenProps) {
        const data = {
            code,
            code_verifier: codeVerifier,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
        };

        const encodedData = qs.stringify(data);

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        return authServer
            .post<OAuthAuthorizationTokenResponse>(
                PATH_OAUTH_TOKEN,
                encodedData,
                {
                    headers,
                },
            )
            .then(res => res.data);
    }

    public static getLoginScreenUrl(codeChallenge: string) {
        const config = qs.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            redirect_uri: `${window.location.origin}/authorize`,
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
        });

        return `${PATH_OAUTH_AUTHORIZE}?${config}`;
    }

    public static async imperativelySendToLoginScreen() {
        const { code_challenge, code_verifier } = await pkceChallenge();
        this.setCodeVerifier(code_verifier);

        const loginUrl = this.getLoginScreenUrl(code_challenge);

        window.location.href = loginUrl;
    }

    // Access Token
    public static getAccessToken() {
        return window.localStorage.getItem(ACCESS_TOKEN);
    }

    public static setAccessToken(token: string) {
        return window.localStorage.setItem(ACCESS_TOKEN, token);
    }

    // Refresh Token
    public static getRefreshToken() {
        return window.localStorage.getItem(REFRESH_TOKEN);
    }

    public static setRefreshToken(token: string) {
        return window.localStorage.setItem(REFRESH_TOKEN, token);
    }

    // Code Verifier
    public static getCodeVerifier() {
        return window.localStorage.getItem(CODE_VERIFIER);
    }

    public static setCodeVerifier(getCodeVerifier: string) {
        return window.localStorage.setItem(CODE_VERIFIER, getCodeVerifier);
    }
}
