import { combineReducers } from 'redux';
import {
  mfaDevicesListReducer,
  mfaDevicesDeleteReducer,
  mfaDevicesAddReducer,
} from './mfaDevices/reducer';

export const accountSettingsReducer = combineReducers({
  mfaDevices: mfaDevicesListReducer,
  mfaDeviceDeletion: mfaDevicesDeleteReducer,
  mfaDeviceAdd: mfaDevicesAddReducer,
});
