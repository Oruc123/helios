import { logoutActionTypes } from './constants';

export const logout = () => ({
  type: logoutActionTypes.AUTH_LOGOUT,
});
