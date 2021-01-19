import { spawn } from 'redux-saga/effects';
import { loginFormSaga } from './login/sagas';
import { forgotFormSaga } from './forgot/sagas';
import { newPasswordFormSaga } from './newPassword/sagas';
import { logoutSaga } from './logout/sagas';
import { tokenExpirationSaga } from './tokenExpired/sagas';
import { challengeExpirationSaga } from './challengeExpired/sagas';
import { organizationSaga } from './organization/sagas';
import { userSaga } from './user/sagas';

export function* authSaga() {
  yield spawn(loginFormSaga);
  yield spawn(forgotFormSaga);
  yield spawn(newPasswordFormSaga);
  yield spawn(logoutSaga);
  yield spawn(tokenExpirationSaga);
  yield spawn(challengeExpirationSaga);
  yield spawn(organizationSaga);
  yield spawn(userSaga);
}
