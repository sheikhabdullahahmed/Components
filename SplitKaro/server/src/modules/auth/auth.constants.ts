export const AUTH_COOKIE = 'access_token';
export const OAUTH_STATE_COOKIE = 'oauth_state';

export type JwtPayload = {
  sub: string;
  email: string;
};
