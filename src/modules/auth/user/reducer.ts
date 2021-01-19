import { AuthUserModel } from 'components/Auth';
import { userActionTypes } from './constants';
import { logoutActionTypes } from '../logout/constants';

export function user(state = null, { type, payload }) {
  switch (type) {
    case userActionTypes.GET_USER_INFO:
      return null;
    case userActionTypes.SET_USER_INFO:
      return AuthUserModel.from(payload);
    case logoutActionTypes.AUTH_LOGOUT:
      return null;
    default:
      return state;
  }
}
