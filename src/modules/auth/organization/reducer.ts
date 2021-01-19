import { organizationActionTypes } from './constants';
import { logoutActionTypes } from '../logout/constants';

export function organization(state = null, { type, payload }) {
  switch (type) {
    case organizationActionTypes.GET_ORGANIZATION:
      return null;
    case organizationActionTypes.SET_ORGANIZATION:
      return payload;
    case logoutActionTypes.AUTH_LOGOUT:
      return null;
    default:
      return state;
  }
}
