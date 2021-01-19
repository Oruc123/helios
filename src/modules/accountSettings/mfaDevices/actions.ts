import { createReadActions } from 'utils/api/read';
import { createDeleteActions } from 'utils/api/delete';
import { createWriteActions } from 'utils/api/write';
import {
  mfaDevicesListActionTypes,
  mfaDevicesDeleteActionTypes,
  mfaDevicesWriteActionTypes,
  ACTIVATE_MFA_DEVICE,
  SET_MFA_DEVICE_AS_DEFAULT,
  RETRY_CHALLENGE,
} from './constants';

export const mfaDevicesListActions = createReadActions(mfaDevicesListActionTypes);
export const mfaDeviceDeleteActions = createDeleteActions(mfaDevicesDeleteActionTypes);
export const mfaDeviceWriteActions = createWriteActions(mfaDevicesWriteActionTypes);

export const activateMFADevice = (code: string) => ({
  type: ACTIVATE_MFA_DEVICE,
  payload: code,
});

export const setMFADeviceAsDefault = (id: number) => ({
  type: SET_MFA_DEVICE_AS_DEFAULT,
  payload: id,
});

export const retryChallenge = () => ({ type: RETRY_CHALLENGE });
