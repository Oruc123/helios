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

export const reportWholesaleListId = 'reports.wholesale.list';
export const reportWholesaleListApiUrl = '/report-wholesale-list';
export const reportWholesaleListPath = MAIN_ALERTS_PATH;
export const reportWholesaleListPaths = {
  add: `${reportWholesaleListPath}/add`,
  edit: `${reportWholesaleListPath}/edit/:id`,
  delete: `${reportWholesaleListPath}/delete/:id`,
  detail: `${reportWholesaleListPath}/detail/:id`
};

export const reportWholesaleListActionTypes = createReadActionTypes(reportWholesaleListId);
export const reportWholesaleListActions = createReadActions(reportWholesaleListActionTypes);
export const reportWholesaleListApi = createReadApi(api, { url: reportWholesaleListApiUrl });
export const reportWholesaleListReducer = createReadReducer(reportWholesaleListActionTypes);
export const reportWholesaleListSaga = createReadSaga(
  reportWholesaleListActionTypes,
  reportWholesaleListActions,
  reportWholesaleListApi,
  authSelector
);
export const reportWholesaleListSelectors = createListSelectors(reportWholesaleListId);
