import store from 'store';
import { logoutActionTypes } from 'modules/auth/logout/constants';
import { loginActionTypes } from 'modules/auth/login/constants';

const storeToken = store.get('authToken') || {};

const authTokenReducerInitialState = Date.now() < storeToken.expirationTime ? storeToken : {};

export function token(state = authTokenReducerInitialState, { type, payload }) {
  switch (type) {
    case loginActionTypes.LOGIN_SET_TOKEN:
      return payload;
    case logoutActionTypes.AUTH_LOGOUT:
      return {};
    default:
      return state;
  }
}
