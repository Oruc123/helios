import { takeLatest, spawn, put, call, select, delay } from 'redux-saga/effects';
import { createReadSaga } from 'utils/api/read';
import { createDeleteSaga } from 'utils/api/delete';
import { createWriteSaga } from 'utils/api/write';
import { push } from 'modules/router/effects';
import { sendChallenge, sendSecurityCode, setDeviceAsDefault } from 'modules/auth/login/effects';
import { configApiSelector } from 'modules/config/config-selectors';
import { authTokenSelector } from 'modules/auth/selectors';
import { mfaDevicesListActions, mfaDeviceDeleteActions, mfaDeviceWriteActions } from './actions';
import { mfaDevicesSelector, mfaDeviceAddSelector } from './selectors';
import {
  mfaDevicesListActionTypes,
  mfaDevicesWriteActionTypes,
  mfaDevicesDeleteActionTypes,
  mfaDevicesPaths,
  ACTIVATE_MFA_DEVICE,
  SET_MFA_DEVICE_AS_DEFAULT,
  RETRY_CHALLENGE,
} from './constants';
import { mfaDevicesListApi, mfaDevicesDeleteApi, mfaDevicesWriteApi } from './api';
import { MFADevicesFormModel, MFADeviceFormModel } from './models';

export const mfaDevicesListSaga = createReadSaga(
  mfaDevicesListActionTypes,
  mfaDevicesListActions,
  mfaDevicesListApi,
  mfaDevicesSelector,
);

/**
 * Device deletion handler.
 */

function* deleteCompletedHandler() {
  yield put(mfaDevicesListActions.read.call(new MFADevicesFormModel()));
  yield call(push, mfaDevicesPaths.index);
}

export function* mfaDeviceDeletionSaga() {
  yield spawn(createDeleteSaga(
    mfaDevicesDeleteActionTypes,
    mfaDeviceDeleteActions,
    mfaDevicesDeleteApi));

  yield takeLatest(mfaDevicesDeleteActionTypes.delete.completed, deleteCompletedHandler);
}

/**
 * New device handler.
 */

function* addCompletedHandler(action) {
  try {
    const deviceId = action.payload.id;
    const totpUrl = action.payload.totp_url;
    const apiConfig = yield select(configApiSelector);
    const token = yield select(authTokenSelector);
    const response = yield call(sendChallenge, apiConfig, token.accessToken, deviceId);
    const form = yield select(mfaDeviceAddSelector);

    yield put(mfaDeviceWriteActions.value.set(form.setValue({
      ...form.getValue(),
      challenge_id: response.challenge_id,
      device_id: deviceId,
      challenge_expiration: new Date(response.expires_at).getTime(),
      challenge_started_at: new Date().getTime(),
      totp_url: totpUrl,
    })));
  } catch {
    yield put(mfaDeviceWriteActions.write.failed(new Error('Error adding device')));
  }
}

export function* mfaDeviceAddSaga() {
  yield spawn(createWriteSaga(
    mfaDevicesWriteActionTypes,
    mfaDeviceWriteActions,
    mfaDevicesWriteApi));

  yield takeLatest(mfaDevicesWriteActionTypes.write.completed, addCompletedHandler);
}

/**
 * Challenge retry handler.
 */

function* retryChallengeHandler() {
  try {
    const form = yield select(mfaDeviceAddSelector);
    const deviceId = form.getValue().device_id;
    const apiConfig = yield select(configApiSelector);
    const token = yield select(authTokenSelector);
    const response = yield call(sendChallenge, apiConfig, token.accessToken, deviceId);

    yield put(mfaDeviceWriteActions.value.set(form.setValue({
      ...form.getValue(),
      challenge_id: response.challenge_id,
      device_id: deviceId,
      challenge_expiration: new Date(response.expires_at).getTime(),
      challenge_started_at: new Date().getTime(),
    })));
  } catch {
    yield put(mfaDeviceWriteActions.write.failed(new Error('Error sending code')));
  }
}

export function* retryChallengeSaga() {
  yield takeLatest(RETRY_CHALLENGE, retryChallengeHandler);
}

/**
 * Device activation handler (sending security code to API).
 */

function* mfaDeviceActivationHandler(action) {
  const form = yield select(mfaDeviceAddSelector);

  try {
    const apiConfig = yield select(configApiSelector);
    const token = yield select(authTokenSelector);

    yield put(mfaDeviceWriteActions.value.set(form.pending()));

    yield call(
      sendSecurityCode,
      apiConfig,
      token.accessToken,
      form.getValue().challenge_id,
      action.payload);

    yield put(mfaDeviceWriteActions.value.set(new MFADeviceFormModel()));
    yield put(mfaDevicesListActions.read.call(new MFADevicesFormModel()));
    yield call(push, mfaDevicesPaths.index);
  } catch {
    const error = new Error('Invalid security code');
    yield put(mfaDeviceWriteActions.write.failed(error));
    yield put(mfaDeviceWriteActions.value.set(
      form.setField('code', form.getField('code').setError(error.message))));
  }
}

export function* mfaDeviceActivateSaga() {
  yield takeLatest(ACTIVATE_MFA_DEVICE, mfaDeviceActivationHandler);
}

/**
 * Challenge expiration handling.
 */

function* challengeWatcher() {
  while (true) {
    const data = yield select(mfaDeviceAddSelector);
    const plain = data.getValue();

    if (!!plain && plain.challenge_expiration) {
      if (+plain.challenge_expiration < Date.now()) {
        yield put(mfaDeviceWriteActions.value.set(new MFADeviceFormModel()));
      }
    }

    yield delay(1000);
  }
}

export function* challengeExpirationSaga() {
  yield spawn(challengeWatcher);
}

/**
 * Handling settings default device.
 */

function* defaultDeviceHandler(action) {
  const apiConfig = yield select(configApiSelector);
  const token = yield select(authTokenSelector);
  yield call(setDeviceAsDefault, apiConfig, token.accessToken, action.payload);
  yield put(mfaDevicesListActions.read.call(new MFADevicesFormModel()));
}

export function* defaultDeviceSaga() {
  yield takeLatest(SET_MFA_DEVICE_AS_DEFAULT, defaultDeviceHandler);
}
