import { call, select, takeLatest, put } from 'redux-saga/effects';
import { push } from 'modules/router/effects';
import { AUTH_LOGIN_PATH } from 'modules/auth/constants';
import { configApiSelector } from 'modules/config/config-selectors';
import { loginSelector } from 'modules/auth/login/selectors';
import { updatePasswordForm } from 'modules/auth/login/actions';
import { actionTypes } from './constants';
import { resetPassword } from './effects';
import { submitFormSuccess, submitFormFailure } from './actions';

function* formSubmitHandler(action) {
  const form = action.payload.getValue();
  const apiConfig = yield select(configApiSelector);

  try {
    const loginForm = yield select(loginSelector);

    yield call(resetPassword, apiConfig, form.email);
    yield put(submitFormSuccess());
    yield put(updatePasswordForm(loginForm.setError(null).setMessage(
      'Link was sent, check your e-mail')));
    yield call(push, AUTH_LOGIN_PATH);
  } catch {
    yield put(submitFormFailure(new Error('Error sending password reset link')));
  }
}

export function* forgotFormSaga() {
  yield takeLatest(actionTypes.FORGOT_SUBMIT, formSubmitHandler);
}
