import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { companyListActions } from 'modules/companies/list';
import { put, takeEvery } from 'redux-saga/effects';
import {
  createReadActions,
  createReadActionTypes,
  createReadApi,
  createReadReducer,
  createReadSaga
} from 'utils/api/read';
import { createListSelectors } from 'utils/list';

export const appSettingsListId = 'appSettings.list';
export const appSettingsListApiUrl = '/organization-setting-list';

/**
 * @param { ReadActionTypes } actionTypes
 * @param { ReadActions } actions
 * @param { Api } api
 * @param { function } authSelector
 */
function createAppSettingsListSaga(actionTypes, actions, api, authSelector) {
  const readAppSettingsListSaga = createReadSaga(actionTypes, actions, api, authSelector);

  function* callReadOrganizationsListSaga() {
    yield put(companyListActions.read.call());
  }

  function* abortReadOrganizationsListSaga() {
    yield put(companyListActions.read.abort());
  }

  return function* appSettingsListSaga() {
    yield* readAppSettingsListSaga();
    yield takeEvery(actionTypes.read.call, callReadOrganizationsListSaga);
    yield takeEvery(actionTypes.read.abort, abortReadOrganizationsListSaga);
  };
}

export const appSettingsListActionTypes = createReadActionTypes(appSettingsListId);
export const appSettingsListActions = createReadActions(appSettingsListActionTypes);
export const appSettingsListApi = createReadApi(api, { url: appSettingsListApiUrl });
export const appSettingsListReducer = createReadReducer(appSettingsListActionTypes);
export const appSettingsListSaga = createAppSettingsListSaga(
  appSettingsListActionTypes,
  appSettingsListActions,
  appSettingsListApi,
  authSelector
);
export const appSettingsListSelectors = createListSelectors(appSettingsListId);
