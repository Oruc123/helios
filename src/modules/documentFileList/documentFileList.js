import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { MAIN_ALERTS_PATH } from 'modules/main/main-constants';
import {
  createReadActions,
  createReadActionTypes,
  createReadApi,
  createReadReducer,
  createReadSaga
} from 'utils/api/read';
import { createListSelectors } from 'utils/list';

export const documentFileListId = 'documentFile.list';
export const documentFileListApiUrl = '/document-file-list';
export const documentFileListPath = MAIN_ALERTS_PATH;
export const documentFileListPaths = {
  add: `${documentFileListPath}/add`,
  edit: `${documentFileListPath}/edit/:id`,
  delete: `${documentFileListPath}/delete/:id`,
  detail: `${documentFileListPath}/detail/:id`
};

export const documentFileListActionTypes = createReadActionTypes(documentFileListId);
export const documentFileListActions = createReadActions(documentFileListActionTypes);
export const documentFileListApi = createReadApi(api, { url: documentFileListApiUrl });
export const documentFileListReducer = createReadReducer(documentFileListActionTypes);
export const documentFileListSaga = createReadSaga(
  documentFileListActionTypes,
  documentFileListActions,
  documentFileListApi,
  authSelector
);
export const documentFileListSelectors = createListSelectors(documentFileListId);
