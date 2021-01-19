import { spawn } from 'redux-saga/effects';
import {
  mfaDevicesListSaga,
  mfaDeviceDeletionSaga,
  mfaDeviceAddSaga,
  mfaDeviceActivateSaga,
  challengeExpirationSaga,
  defaultDeviceSaga,
  retryChallengeSaga,
} from './mfaDevices/sagas';

export function* accountSettingsSaga() {
  yield spawn(mfaDevicesListSaga);
  yield spawn(mfaDeviceDeletionSaga);
  yield spawn(mfaDeviceAddSaga);
  yield spawn(mfaDeviceActivateSaga);
  yield spawn(challengeExpirationSaga);
  yield spawn(defaultDeviceSaga);
  yield spawn(retryChallengeSaga);
}
