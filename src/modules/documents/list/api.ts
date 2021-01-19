import { api } from 'modules/api';
import { createReadApi } from 'utils/api/read';

const documentsListApiUrl = '/document-list';

export const documentsListApi = createReadApi(api, { url: documentsListApiUrl });
