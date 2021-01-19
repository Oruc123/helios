import { call, select, takeLatest, put } from 'redux-saga/effects';
import { push } from 'modules/router/effects';
import { AUTH_LOGIN_PATH } from 'modules/auth/constants';
import { configApiSelector } from 'modules/config/config-selectors';
import { newPasswordActionTypes } from './constants';
import { setNewPassword } from './effects';
import { submitNewPasswordFormSuccess, submitNewPasswordFormFailure } from './actions';

function* formSubmitHandler(action) {
  try {
    const { key, password } = action.payload.getValue();
    const apiConfig = yield select(configApiSelector);
    yield call(setNewPassword, apiConfig, key, password);
    yield put(submitNewPasswordFormSuccess());
    yield call(push, AUTH_LOGIN_PATH);
  } catch {
    yield put(submitNewPasswordFormFailure(new Error('Error setting new password')));
  }
}

export function* newPasswordFormSaga() {
  yield takeLatest(newPasswordActionTypes.NEW_PASSWORD_SUBMIT, formSubmitHandler);
}
