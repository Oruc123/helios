import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { MAIN_DOCUMENTS_DUE_PATH } from 'modules/main/main-constants';
import {
  createReadActions,
  createReadActionTypes,
  createReadApi,
  createReadReducer,
  createReadSaga
} from 'utils/api/read';
import { createListSelectors } from 'utils/list';

export const documentsDueListId = 'documentsDue.list';
export const documentsDueListApiUrl = '/document-period-alerts-list';
export const documentsDueListPath = MAIN_DOCUMENTS_DUE_PATH;
export const documentsDueListPaths = {
  add: `${documentsDueListPath}/add`,
  edit: `${documentsDueListPath}/edit/:id`,
  delete: `${documentsDueListPath}/delete/:id`,
  detail: `${documentsDueListPath}/detail/:id`
};

export const documentsDueListActionTypes = createReadActionTypes(documentsDueListId);
export const documentsDueListActions = createReadActions(documentsDueListActionTypes);
export const documentsDueListApi = createReadApi(api, { url: documentsDueListApiUrl });
export const documentsDueListReducer = createReadReducer(documentsDueListActionTypes);
export const documentsDueListSaga = createReadSaga(
  documentsDueListActionTypes,
  documentsDueListActions,
  documentsDueListApi,
  authSelector
);
export const documentsDueListSelectors = createListSelectors(documentsDueListId);
