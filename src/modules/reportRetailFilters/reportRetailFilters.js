import { AlertsReportsFilterModel } from 'components/Alerts/AlertsReportsFilterModel';
import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { history } from 'modules/router';
import { reportRetailListActions, reportRetailListPath, reportRetailListApi } from 'modules/reportRetailList';
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
function createreportRetailFiltersSaga(actionTypes, actions, api, authSelector) {
  const writeSaga = createWriteSaga(actionTypes, actions, api, authSelector);

  function* writeCompletedSaga() {
    yield put(reportRetailListActions.read.call());
    yield call(history.push, reportRetailListPath);
  }

  return function* transfersWriteSaga() {
    yield* writeSaga();
    yield takeEvery(actionTypes.write.completed, writeCompletedSaga);
  };
}

export const reportRetailFiltersId = 'reports.retail.filters';
export const reportRetailFiltersActionTypes = createWriteActionTypes(reportRetailFiltersId);
export const reportRetailFiltersActions = createWriteActions(reportRetailFiltersActionTypes);
export const reportRetailFiltersApi = createWriteApi(api, { url: reportRetailListApi });
export const reportRetailFiltersReducer = createWriteReducer(
  reportRetailFiltersActionTypes,
  new AlertsReportsFilterModel()
);
export const reportRetailFiltersSaga = createreportRetailFiltersSaga(
  reportRetailFiltersActionTypes,
  reportRetailFiltersActions,
  reportRetailFiltersApi,
  authSelector
);
export const reportRetailFiltersSelectors = createEntitySelectors(reportRetailFiltersId);
