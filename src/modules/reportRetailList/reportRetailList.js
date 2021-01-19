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

export const reportRetailListId = 'reports.retail.list';
export const reportRetailListApiUrl = '/report-retail-list';
export const reportRetailListPath = MAIN_ALERTS_PATH;
export const reportRetailListPaths = {
  add: `${reportRetailListPath}/add`,
  edit: `${reportRetailListPath}/edit/:id`,
  delete: `${reportRetailListPath}/delete/:id`,
  detail: `${reportRetailListPath}/detail/:id`
};

export const reportRetailListActionTypes = createReadActionTypes(reportRetailListId);
export const reportRetailListActions = createReadActions(reportRetailListActionTypes);
export const reportRetailListApi = createReadApi(api, { url: reportRetailListApiUrl });
export const reportRetailListReducer = createReadReducer(reportRetailListActionTypes);
export const reportRetailListSaga = createReadSaga(
  reportRetailListActionTypes,
  reportRetailListActions,
  reportRetailListApi,
  authSelector
);
export const reportRetailListSelectors = createListSelectors(reportRetailListId);
