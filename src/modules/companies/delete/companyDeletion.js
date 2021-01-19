import { CompanyFormModel } from 'components/CompanyForm';
import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { history } from 'modules/router';
import { companyListActions, companyListPath } from 'modules/companies/list';
import { companyFiltersSelectors } from 'modules/companies/filters';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  createDeleteActions,
  createDeleteActionTypes,
  createDeleteApi,
  createDeleteReducer,
  createDeleteSaga
} from 'utils/api';
import { createEntitySelectors } from 'utils/entity';

/**
 * @param { WriteActionTypes } actionTypes
 * @param { WriteActions } actions
 * @param { WriteApi } api
 * @param { function } authSelector
 */
function deleteCompanySaga(actionTypes, actions, api, authSelector) {
  const deleteSaga = createDeleteSaga(actionTypes, actions, api, authSelector);

  function* deleteCompletedSaga() {
    const companyFiltersModel = yield select(companyFiltersSelectors.getEntity);
    yield put(companyListActions.read.call(companyFiltersModel));
    yield call(history.push, companyListPath);
  }

  return function* companyWriteSaga() {
    yield* deleteSaga();
    yield takeEvery(actionTypes.delete.completed, deleteCompletedSaga);
  };
}

export const companyDeletionId = 'companies.deletion';
export const companyDeletionApiUrl = '/company';
export const companyDeletionActionTypes = createDeleteActionTypes(companyDeletionId);
export const companyDeletionActions = createDeleteActions(companyDeletionActionTypes);
export const companyDeletionApi = createDeleteApi(api, { url: companyDeletionApiUrl });
export const companyDeletionReducer = createDeleteReducer(companyDeletionActionTypes, new CompanyFormModel());
export const companyDeletionSaga = deleteCompanySaga(
  companyDeletionActionTypes,
  companyDeletionActions,
  companyDeletionApi,
  authSelector
);
export const companyDeletionSelectors = createEntitySelectors(companyDeletionId);
