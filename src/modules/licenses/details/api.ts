import { api } from 'modules/api';
import { createReadApi } from 'utils/api/read';
import { LICENSE_DETAILS_URL } from './constants';

export const licenseDetailsApi = createReadApi(api, { url: LICENSE_DETAILS_URL });
