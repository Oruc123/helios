import { put, takeEvery } from 'redux-saga/effects';

import { loginFormSubmitSuccess } from './LoginFormActions';
import { LOGIN_FORM_SUBMIT } from './LoginFormActionTypes';

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* loginFormSubmitSaga() {
  // eslint-disable-next-line no-console
  yield delay(1000);
  yield put(loginFormSubmitSuccess());
}

export function* loginFormSaga() {
  yield takeEvery(LOGIN_FORM_SUBMIT, loginFormSubmitSaga);
}
