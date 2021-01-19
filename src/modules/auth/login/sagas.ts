import store from 'store';
import { takeLatest, select, call, put } from 'redux-saga/effects';
import { push } from 'modules/router/effects';
import { configApiSelector } from 'modules/config/config-selectors';
import { MAIN_PATH } from 'modules/main';
import {
  sendUsernamePassword,
  createDevice,
  sendChallenge as sendChallengeEffect,
  sendSecurityCode,
} from './effects';
import {
  mfaTokenSelector,
  mfaDevicesSelector,
  chooseDeviceFormSelector,
  challengeSelector, challengeFormSelector,
} from './selectors';
import {
  submitUsernamePasswordFailure,
  submitUsernamePasswordSuccess,
  setMFAData,
  chooseMfaDevice,
  sendChallenge,
  createDeviceFailure,
  sendChallengeSuccess,
  sendChallengeFailure,
  sendSecurityCodeFailure,
  setToken,
  updateChooseDeviceForm,
  updateSecurityCodeForm,
  updateDeviceForm,
} from './actions';
import { loginActionTypes } from './constants';

/**
 * Save token to store and load basic account dependent data.
 * @param {string} rawToken - access token to be stored.
 * @param {string} expirationDate - token expiration time.
 * @return {IterableIterator<any>} - operation effect.
 */
function* saveTokenAndLoadBasicData(rawToken: string, expirationDate: string) {
  const token = { accessToken: rawToken, expirationTime: new Date(expirationDate).getTime() };
  store.set('authToken', token);
  yield put(setToken(token));
  yield call(push, MAIN_PATH);
}

/**
 * Password submission handler.
 */

function* signInHandler(action) {
  const form = action.payload.getValue();
  const apiConfig = yield select(configApiSelector);

  try {
    const response = yield call(sendUsernamePassword, apiConfig, form.username, form.password);
    yield put(setMFAData(response));
    yield put(submitUsernamePasswordSuccess(action.payload));

    if (!!response.access_token && !response.mfa_required) {
      yield saveTokenAndLoadBasicData(response.access_token, response.expires_at);
    } else if (response.mfa_devices.length >= 1) {
        const token = response.mfa_token;

        const device =
          response.mfa_devices.find(d => d.default) ||
          response.mfa_devices.sort((a, b) =>
            new Date(b.last_used_at).getTime() - new Date(a.last_used_at).getTime())[0];

        // Set chosen device for challenge.
        yield put(chooseMfaDevice({
          id: device.id,
          type: device.type,
          name: device.phone_number || device.email || 'MFA Application',
          totpUrl: device.totp_url,
        }));

        // Send challenge.
        yield put(sendChallenge({ token, deviceId: device.id }));

        // Set chosen device for choosing device form.
        const chooseDeviceForm = yield select(chooseDeviceFormSelector);
        yield put(updateChooseDeviceForm(
          chooseDeviceForm.setValue({ chosenId: device.id })));
      }
  } catch (error) {
    yield put(submitUsernamePasswordFailure(
      action.payload, new Error('Wrong username or password')));
  }
}

/**
 * Device creation handler. After successful creation we choose new device and send challenge
 * to activate device and move user on to security code page.
 */

function* createDeviceHandler(action) {
  const form = action.payload.getValue();
  const token = yield select(mfaTokenSelector);
  const apiConfig = yield select(configApiSelector);

  try {
    const response = yield call(createDevice, apiConfig, token, form.type, form.name);
    yield put(chooseMfaDevice({
      id: response.id,
      type: form.type,
      name: form.name || 'MFA Application',
      totpUrl: response.totp_url,
    }));
    yield put(sendChallenge({ token, deviceId: response.id }));
  } catch {
    yield put(updateDeviceForm(
      form.setField('name', form.getField('name').setError(''))));
    yield put(createDeviceFailure(new Error('Error registering your device')));
  }
}

/**
 * Fired every time, when we want to send a challenge.
 */

function* challengeHandler(action) {
  try {
    const { token, deviceId } = action.payload;
    const apiConfig = yield select(configApiSelector);
    const response = yield call(sendChallengeEffect, apiConfig, token, deviceId);

    yield put(sendChallengeSuccess({
      id: response.challenge_id,
      expiration: new Date(response.expires_at).getTime(),
    }));
  } catch {
    yield put(sendChallengeFailure(new Error('Error sending security code')));
  }
}

/**
 * Security code handling. After successful submission we store token and redirect user
 * to secured area.
 */

function* securityCodeHandler(action) {
  const challenge = action.payload.getValue();
  const token = yield select(mfaTokenSelector);
  const apiConfig = yield select(configApiSelector);

  try {
    const response =
      yield call(sendSecurityCode, apiConfig, token, challenge.challengeId, challenge.code);
    yield saveTokenAndLoadBasicData(response.access_token, response.expires_at);
  } catch (error) {
    const form = yield select(challengeFormSelector);
    const exception = new Error('Wrong security code');
    yield put(updateSecurityCodeForm(
      form.setField('code', form.getField('code').setError(''))));
    yield put(sendSecurityCodeFailure(exception));
  }
}

/**
 * Set chosen device on the login step where user is asked to choose one device from
 * several available.
 */

function* deviceChosenHandler(action) {
  const devices = yield select(mfaDevicesSelector);
  const form = action.payload.getValue();
  const device = devices.find(d => d.id === form.chosenId);
  const token = yield select(mfaTokenSelector);

  yield put(chooseMfaDevice({
    id: device.id,
    type: device.type,
    name: device.phone_number || device.email || 'MFA Application',
    totpUrl: null,
  }));

  yield put(sendChallenge({ token, deviceId: form.chosenId }));
}

/**
 * Send new challenge if user didn't receive security code.
 */

function* retryChallengeHandler() {
  const token = yield select(mfaTokenSelector);
  const challenge = yield select(challengeSelector);
  yield put(sendChallenge({ token, deviceId: challenge.deviceId }));
}

export function* loginFormSaga() {
  yield takeLatest(loginActionTypes.LOGIN_SUBMIT_PASSWORD, signInHandler);
  yield takeLatest(loginActionTypes.LOGIN_CREATE_DEVICE, createDeviceHandler);
  yield takeLatest(loginActionTypes.LOGIN_SEND_CHALLENGE, challengeHandler);
  yield takeLatest(loginActionTypes.LOGIN_SEND_SECURITY_CODE, securityCodeHandler);
  yield takeLatest(loginActionTypes.LOGIN_SUBMIT_CHOOSE_DEVICE_FORM, deviceChosenHandler);
  yield takeLatest(loginActionTypes.LOGIN_RETRY_CHALLENGE, retryChallengeHandler);
}
