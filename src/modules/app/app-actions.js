import { APP_LOGIN, APP_LOGOUT } from 'modules/app/app-constants';

export const appLogin = payload => ({
  type: APP_LOGIN,
  payload
});

export const appLogout = () => ({
  type: APP_LOGOUT
});
