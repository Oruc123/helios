import { MFA_DEVICES_STATE, MFA_DEVICE_DELETION_STATE, MFA_DEVICE_ADD_STATE } from './constants';
import { accountSettingsSelector } from '../selectors';

export const mfaDevicesSelector = state => accountSettingsSelector(state)[MFA_DEVICES_STATE];

export const mfaDeviceDeletionSelector = state =>
  accountSettingsSelector(state)[MFA_DEVICE_DELETION_STATE];

export const mfaDeviceAddSelector = state =>
  accountSettingsSelector(state)[MFA_DEVICE_ADD_STATE];
