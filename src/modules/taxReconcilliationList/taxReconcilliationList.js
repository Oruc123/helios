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

export const taxReconcilliationListId = 'taxReconcilliation.list';
export const taxReconcilliationListApiUrl = '/report-tax-reconciliation-list';
export const taxReconcilliationListPath = MAIN_ALERTS_PATH;
export const taxReconcilliationListPaths = {
  add: `${taxReconcilliationListPath}/add`,
  edit: `${taxReconcilliationListPath}/edit/:id`,
  delete: `${taxReconcilliationListPath}/delete/:id`,
  detail: `${taxReconcilliationListPath}/detail/:id`
};

export const taxReconcilliationListActionTypes = createReadActionTypes(taxReconcilliationListId);
export const taxReconcilliationListActions = createReadActions(taxReconcilliationListActionTypes);
export const taxReconcilliationListApi = createReadApi(api, { url: taxReconcilliationListApiUrl });
export const taxReconcilliationListReducer = createReadReducer(taxReconcilliationListActionTypes);
export const taxReconcilliationListSaga = createReadSaga(
  taxReconcilliationListActionTypes,
  taxReconcilliationListActions,
  taxReconcilliationListApi,
  authSelector
);
export const taxReconcilliationListSelectors = createListSelectors(taxReconcilliationListId);
