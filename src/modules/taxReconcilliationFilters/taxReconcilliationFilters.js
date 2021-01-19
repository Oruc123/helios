import { AlertsReportsFilterModel } from 'components/Alerts/AlertsReportsFilterModel';
import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { history } from 'modules/router';
import {
  taxReconcilliationListActions,
  taxReconcilliationListPath,
  taxReconcilliationListApi
} from 'modules/taxReconcilliationList';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  createWriteActions,
  createWriteActionTypes,
  createWriteApi,
  createWriteReducer,
  createWriteSaga
} from 'utils/api';
import { createEntitySelectors } from 'utils/entity';

/**
 * @param { WriteActionTypes } actionTypes
 * @param { WriteActions } actions
 * @param { WriteApi } api
 * @param { function } authSelector
 */
function createtaxReconcilliationFiltersSaga(actionTypes, actions, api, authSelector) {
  const writeSaga = createWriteSaga(actionTypes, actions, api, authSelector);

  function* writeCompletedSaga() {
    yield put(taxReconcilliationListActions.read.call());
    yield call(history.push, taxReconcilliationListPath);
  }

  return function* transfersWriteSaga() {
    yield* writeSaga();
    yield takeEvery(actionTypes.write.completed, writeCompletedSaga);
  };
}

export const taxReconcilliationFiltersId = 'taxReconcilliation.filters';
export const taxReconcilliationFiltersActionTypes = createWriteActionTypes(taxReconcilliationFiltersId);
export const taxReconcilliationFiltersActions = createWriteActions(taxReconcilliationFiltersActionTypes);
export const taxReconcilliationFiltersApi = createWriteApi(api, { url: taxReconcilliationListApi });
export const taxReconcilliationFiltersReducer = createWriteReducer(
  taxReconcilliationFiltersActionTypes,
  new AlertsReportsFilterModel()
);
export const taxReconcilliationFiltersSaga = createtaxReconcilliationFiltersSaga(
  taxReconcilliationFiltersActionTypes,
  taxReconcilliationFiltersActions,
  taxReconcilliationFiltersApi,
  authSelector
);
export const taxReconcilliationFiltersSelectors = createEntitySelectors(taxReconcilliationFiltersId);
