import { createReadActionTypes } from 'utils/api/read';
import { createWriteActionTypes } from 'utils/api/write';
import { createDeleteActionTypes } from 'utils/api/delete';
import { ACCOUNT_SETTINGS_PATH } from '../constants';

const mfaDevicesId = 'mfaDevices';
const mfaDeviceDeletionId = 'mfaDeviceDeletion';
const mfaDeviceAddId = 'mfaDeviceAdd';

export const ACTIVATE_MFA_DEVICE = 'accountSettings/mfa/activate';
export const SET_MFA_DEVICE_AS_DEFAULT = 'accountSettings/mfa/set-default';
export const RETRY_CHALLENGE = 'accountSettings/mfa/retry-challenge';

export const MFA_DEVICES_STATE = 'mfaDevices';
export const MFA_DEVICE_DELETION_STATE = 'mfaDeviceDeletion';
export const MFA_DEVICE_ADD_STATE = 'mfaDeviceAdd';

export const mfaDevicesListActionTypes = createReadActionTypes(mfaDevicesId);
export const mfaDevicesDeleteActionTypes = createDeleteActionTypes(mfaDeviceDeletionId);
export const mfaDevicesWriteActionTypes = createWriteActionTypes(mfaDeviceAddId);

export const mfaDevicesPaths = {
  index: ACCOUNT_SETTINGS_PATH,
  add: `${ACCOUNT_SETTINGS_PATH}/mfa/add`,
  delete: `${ACCOUNT_SETTINGS_PATH}/mfa/delete/:id`,
};
