import { AlertsReportsFilterModel } from 'components/Alerts/AlertsReportsFilterModel';
import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { history } from 'modules/router';
import {
  reportWholesaleListActions,
  reportWholesaleListPath,
  reportWholesaleListApi
} from 'modules/reportWholesaleList';
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
function createreportWholesaleFiltersSaga(actionTypes, actions, api, authSelector) {
  const writeSaga = createWriteSaga(actionTypes, actions, api, authSelector);

  function* writeCompletedSaga() {
    yield put(reportWholesaleListActions.read.call());
    yield call(history.push, reportWholesaleListPath);
  }

  return function* transfersWriteSaga() {
    yield* writeSaga();
    yield takeEvery(actionTypes.write.completed, writeCompletedSaga);
  };
}

export const reportWholesaleFiltersId = 'reports.wholesale.filters';
export const reportWholesaleFiltersActionTypes = createWriteActionTypes(reportWholesaleFiltersId);
export const reportWholesaleFiltersActions = createWriteActions(reportWholesaleFiltersActionTypes);
export const reportWholesaleFiltersApi = createWriteApi(api, { url: reportWholesaleListApi });
export const reportWholesaleFiltersReducer = createWriteReducer(
  reportWholesaleFiltersActionTypes,
  new AlertsReportsFilterModel()
);
export const reportWholesaleFiltersSaga = createreportWholesaleFiltersSaga(
  reportWholesaleFiltersActionTypes,
  reportWholesaleFiltersActions,
  reportWholesaleFiltersApi,
  authSelector
);
export const reportWholesaleFiltersSelectors = createEntitySelectors(reportWholesaleFiltersId);
