import {
  mfaDevicesListActionTypes,
  mfaDevicesDeleteActionTypes,
  mfaDevicesWriteActionTypes,
} from 'modules/accountSettings/mfaDevices/constants';
import { createReadReducer } from 'utils/api/read';
import { createDeleteReducer } from 'utils/api/delete';
import { createWriteReducer } from 'utils/api/write';
import { MFADevicesFormModel, MFADeviceFormModel } from './models';

export const mfaDevicesListReducer = createReadReducer(mfaDevicesListActionTypes);

export const mfaDevicesDeleteReducer = createDeleteReducer(
  mfaDevicesDeleteActionTypes,
  new MFADevicesFormModel());

export const mfaDevicesAddReducer = createWriteReducer(
  mfaDevicesWriteActionTypes,
  new MFADeviceFormModel());
