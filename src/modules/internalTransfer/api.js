import { api } from 'modules/api';
import { createReadApi } from 'utils/api/read';
import { MAIN_INTERNAL_TRANSFERS_PATH } from 'modules/main/main-constants';

export const internalTransferApiUrl = '/internal-transfer-list';
export const internalTransferPath = MAIN_INTERNAL_TRANSFERS_PATH;
export const internalTransferApi = createReadApi(api, { url: internalTransferApiUrl });
