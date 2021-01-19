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

export const companyListId = 'companies.list';
export const companyListApiUrl = '/company-list';
export const companyListPath = `${MAIN_PATH}/relationships`;
export const companyListPaths = {
  add: `${companyListPath}/add`,
  edit: `${companyListPath}/edit/:id`,
  delete: `${companyListPath}/delete/:id`,
  detail: `${companyListPath}/detail/:id`,
  invite: `${companyListPath}/detail/:id/invite`
};

export const companyListActionTypes = createReadActionTypes(companyListId);
export const companyListActions = createReadActions(companyListActionTypes);
export const companyListApi = createReadApi(api, { url: companyListApiUrl });
export const companyListReducer = createReadReducer(companyListActionTypes);
export const companyListSaga = createReadSaga(companyListActionTypes, companyListActions, companyListApi, authSelector);
export const companyListSelectors = createListSelectors(companyListId);
