import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { MAIN_INTERNAL_TRANSFERS_PATH } from 'modules/main/main-constants';
import {
  createReadActions,
  createReadActionTypes,
  createReadApi,
  createReadReducer,
  createReadSaga
} from 'utils/api/read';
import { createListSelectors } from 'utils/list';

export const transfersListId = 'internalTransfers.list';
export const transfersListApiUrl = '/internal-transfer-list';
export const transfersListPath = MAIN_INTERNAL_TRANSFERS_PATH;
export const transfersListPaths = {
  add: `${transfersListPath}/add`,
  edit: `${transfersListPath}/edit/:id`,
  delete: `${transfersListPath}/delete/:id`,
  detail: `${transfersListPath}/detail/:id`
};

export const transfersListActionTypes = createReadActionTypes(transfersListId);
export const transfersListActions = createReadActions(transfersListActionTypes);
export const transfersListApi = createReadApi(api, { url: transfersListApiUrl });
export const transfersListReducer = createReadReducer(transfersListActionTypes);
export const transfersListSaga = createReadSaga(
  transfersListActionTypes,
  transfersListActions,
  transfersListApi,
  authSelector
);
export const transfersListSelectors = createListSelectors(transfersListId);
