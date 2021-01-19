import store from 'store';
import { takeLatest, call } from 'redux-saga/effects';
import { push } from 'modules/router/effects';
import { logoutActionTypes } from './constants';
import { AUTH_LOGIN_PATH } from '../constants';

function* logoutHandler() {
  store.remove('authToken');
  yield call(push, AUTH_LOGIN_PATH);
}

export function* logoutSaga() {
  yield takeLatest(logoutActionTypes.AUTH_LOGOUT, logoutHandler);
}
