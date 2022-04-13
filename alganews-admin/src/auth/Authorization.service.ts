import pkceChallenge from 'pkce-challenge';
import axios from 'axios';
import qs from 'qs';

interface GetFirstAccessTokenProps {
  code: string;
  codeVerifier: string;
  redirectUri: string;
}

export interface OAuthAuthorizationTokenResponse {
  access_token: string;
  token_type: 'bearer' | string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  [key: string]: string | number;
}

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const CODE_VERIFIER = 'codeVerifier';

const URL = 'http://localhost:8081';

const authServer = axios.create({
  baseURL: URL,
});

export class AuthService {
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
      client_id: 'alganews-admin',
    };

    const encodedData = qs.stringify(data);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    return authServer
      .post<OAuthAuthorizationTokenResponse>('/oauth/token', encodedData, {
        headers,
      })
      .then((res) => res.data);
  }

  public static getLoginScreenUrl(codeChallenge: string) {
    const config = qs.stringify({
      response_type: 'code',
      client_id: 'alganews-admin',
      redirect_uri: `${window.location.origin}/authorize`,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    return `${URL}/oauth/authorize?${config}`;
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
