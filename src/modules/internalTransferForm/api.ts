import { api } from 'modules/api';
import { createWriteApi } from 'utils/api/write';
import { createDeleteApi } from 'utils/api/delete';

const internalTransferWriteApiUrl = '/internal-transfer';
const internalTransferDeleteApiUrl = '/internal-transfer';

export const internalTransferWriteApi = createWriteApi(api, { url: internalTransferWriteApiUrl });

export const internalTransferDeleteApi =
  createDeleteApi(api, { url: internalTransferDeleteApiUrl });
