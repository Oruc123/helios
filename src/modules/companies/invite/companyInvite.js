import { CompanyInviteModel } from 'components/CompanyInvite';
import { salesforceApi } from 'modules/api';
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
function createCompanyInviteSaga(actionTypes, actions, api, authSelector) {
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

export const companyInviteId = 'companies.invite';
export const companyInviteApiUrl = '/settings/client-user-creation';
export const companyInviteActionTypes = createWriteActionTypes(companyInviteId);
export const companyInviteActions = createWriteActions(companyInviteActionTypes);
export const companyInviteApi = createWriteApi(salesforceApi, { url: companyInviteApiUrl });
export const companyInviteReducer = createWriteReducer(companyInviteActionTypes, new CompanyInviteModel());
export const companyInviteSaga = createCompanyInviteSaga(
  companyInviteActionTypes,
  companyInviteActions,
  companyInviteApi,
  authSelector
);
export const companyInviteSelectors = createEntitySelectors(companyInviteId);
