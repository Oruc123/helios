import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { MAIN_PATH } from 'modules/main/main-constants';
import {
  createReadActions,
  createReadActionTypes,
  createReadApi,
  createReadReducer,
  createReadSaga
} from 'utils/api/read';
import { createListSelectors } from 'utils/list';

export const userListId = 'users.list';
export const userListApiUrl = '/user-list';
export const userListPath = `${MAIN_PATH}/users`;
export const userListPaths = {
  add: `${userListPath}/add`,
  delete: `${userListPath}/delete/:userId`,
  edit: `${userListPath}/edit/:userId`
};

export const userListActionTypes = createReadActionTypes(userListId);
export const userListActions = createReadActions(userListActionTypes);
export const userListApi = createReadApi(api, { url: userListApiUrl });
export const userListReducer = createReadReducer(userListActionTypes);
export const userListSaga = createReadSaga(userListActionTypes, userListActions, userListApi, authSelector);
export const userListSelectors = createListSelectors(userListId);
