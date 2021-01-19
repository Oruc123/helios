import { mfaAuthApi } from 'modules/api';
import { createReadApi } from 'utils/api/read';
import { createDeleteApi } from 'utils/api/delete';
import { createWriteApi } from 'utils/api/write';

const mfaDevicesListApiUrl = '/mfa/device-list';
const mfaDeviceDeleteApiUrl = '/mfa/device';
const mfaDeviceWriteApiUrl = '/mfa/device';

export const mfaDevicesListApi = createReadApi(mfaAuthApi, { url: mfaDevicesListApiUrl });
export const mfaDevicesDeleteApi = createDeleteApi(mfaAuthApi, { url: mfaDeviceDeleteApiUrl });
export const mfaDevicesWriteApi = createWriteApi(mfaAuthApi, { url: mfaDeviceWriteApiUrl });
