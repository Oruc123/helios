import { put, delay, spawn, select } from 'redux-saga/effects';
import { authTokenSelector } from 'modules/auth/selectors';
import { logout } from '../logout/actions';

function* tokenWatcher() {
  while (true) {
    const token = yield select(authTokenSelector);

    if (token) {
      const expiration = +token.expirationTime;

      if (!!expiration && expiration < Date.now()) {
        yield put(logout());
      }
    }

    yield delay(1000);
  }
}

export function* tokenExpirationSaga() {
  yield spawn(tokenWatcher);
}
