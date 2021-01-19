import { put, delay, spawn, select } from 'redux-saga/effects';
import { challengeSelector } from 'modules/auth/login/selectors';
import { authTokenSelector } from 'modules/auth/selectors';
import { logout } from '../logout/actions';

function* challengeWatcher() {
  while (true) {
    const challenge = yield select(challengeSelector);
    const token = yield select(authTokenSelector);

    if (!!challenge && challenge.challengeExpiration) {
      if (+challenge.challengeExpiration < Date.now() && !(!!token && !!token.accessToken)) {
        yield put(logout());
      }
    }

    yield delay(1000);
  }
}

export function* challengeExpirationSaga() {
  yield spawn(challengeWatcher);
}
