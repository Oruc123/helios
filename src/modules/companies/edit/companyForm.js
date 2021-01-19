import { CompanyFormModel } from 'components/CompanyForm';
import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { history } from 'modules/router';
import { companyListActions, companyListPath } from 'modules/companies/list';
import { companyFiltersSelectors } from 'modules/companies/filters';
import { call, put, select, takeEvery } from 'redux-saga/effects';
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
function createCompanyFormSaga(actionTypes, actions, api, authSelector) {
  const writeSaga = createWriteSaga(actionTypes, actions, api, authSelector);

  function* writeCompletedSaga() {
    const companyFiltersModel = yield select(companyFiltersSelectors.getEntity);
    yield put(companyListActions.read.call(companyFiltersModel));
    yield call(history.push, companyListPath);
  }

  return function* companyWriteSaga() {
    yield* writeSaga();
    yield takeEvery(actionTypes.write.completed, writeCompletedSaga);
  };
}

export const companyFormId = 'companies.form';
export const companyFormApiUrl = '/company';
export const companyFormActionTypes = createWriteActionTypes(companyFormId);
export const companyFormActions = createWriteActions(companyFormActionTypes);
export const companyFormApi = createWriteApi(api, { url: companyFormApiUrl });
export const companyFormReducer = createWriteReducer(companyFormActionTypes, new CompanyFormModel());
export const companyFormSaga = createCompanyFormSaga(
  companyFormActionTypes,
  companyFormActions,
  companyFormApi,
  authSelector
);
export const companyFormSelectors = createEntitySelectors(companyFormId);
