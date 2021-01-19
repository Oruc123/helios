import { AUTH_STATE } from 'modules/auth/constants';

export const authSelector = state => state[AUTH_STATE];

export const authTokenSelector = state => authSelector(state).token;

export const authAccessTokenSelector = (state) => {
  const token = authTokenSelector(state);

  return token ? token.accessToken : null;
};

export const authUserSelector = state => authSelector(state).user;

export const authOrgSelector = state => authSelector(state).organization;
