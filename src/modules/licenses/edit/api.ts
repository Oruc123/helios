import { api } from 'modules/api';
import { createWriteApi } from 'utils/api/write';
import { createDeleteApi } from 'utils/api/delete';

const licenseWriteApiUrl = '/license';
const licenseDeleteApiUrl = '/license';

export const licenseWriteApi = createWriteApi(api, { url: licenseWriteApiUrl });
export const licenseDeleteApi = createDeleteApi(api, { url: licenseDeleteApiUrl });
