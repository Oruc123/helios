import { CompanyFiltersModel } from 'components/CompanyFilters';
import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { history } from 'modules/router';
import { companyListActions, companyListPath, companyListApiUrl } from 'modules/companies/list';
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
function createcompanyFiltersSaga(actionTypes, actions, api, authSelector) {
  const writeSaga = createWriteSaga(actionTypes, actions, api, authSelector);

  function* writeCompletedSaga() {
    yield put(companyListActions.read.call());
    yield call(history.push, companyListPath);
  }

  return function* companyWriteSaga() {
    yield* writeSaga();
    yield takeEvery(actionTypes.write.completed, writeCompletedSaga);
  };
}

export const companyFiltersId = 'companies.filters';
export const companyFiltersActionTypes = createWriteActionTypes(companyFiltersId);
export const companyFiltersActions = createWriteActions(companyFiltersActionTypes);
export const companyFiltersApi = createWriteApi(api, { url: companyListApiUrl });
export const companyFiltersReducer = createWriteReducer(companyFiltersActionTypes, new CompanyFiltersModel());
export const companyFiltersSaga = createcompanyFiltersSaga(
  companyFiltersActionTypes,
  companyFiltersActions,
  companyFiltersApi,
  authSelector
);
export const companyFiltersSelectors = createEntitySelectors(companyFiltersId);
