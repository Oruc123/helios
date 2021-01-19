import { api } from 'modules/api';
import { createReadApi } from 'utils/api/read';
import { COMPANY_DETAILS_API_URL } from './constants';

export const companyDetailsApi = createReadApi(api, { url: COMPANY_DETAILS_API_URL });
