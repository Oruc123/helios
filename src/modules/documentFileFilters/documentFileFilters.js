import { AlertsDocumentsFilterModel } from 'components/Alerts/AlertsDocumentsFilterModel';
import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { history } from 'modules/router';
import { documentFileListActions, documentFileListPath, documentFileListApi } from 'modules/documentFileList';
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
function createdocumentFileFiltersSaga(actionTypes, actions, api, authSelector) {
  const writeSaga = createWriteSaga(actionTypes, actions, api, authSelector);

  function* writeCompletedSaga() {
    yield put(documentFileListActions.read.call());
    yield call(history.push, documentFileListPath);
  }

  return function* transfersWriteSaga() {
    yield* writeSaga();
    yield takeEvery(actionTypes.write.completed, writeCompletedSaga);
  };
}

export const documentFileFiltersId = 'documentFile.filters';
export const documentFileFiltersActionTypes = createWriteActionTypes(documentFileFiltersId);
export const documentFileFiltersActions = createWriteActions(documentFileFiltersActionTypes);
export const documentFileFiltersApi = createWriteApi(api, { url: documentFileListApi });
export const documentFileFiltersReducer = createWriteReducer(
  documentFileFiltersActionTypes,
  new AlertsDocumentsFilterModel()
);
export const documentFileFiltersSaga = createdocumentFileFiltersSaga(
  documentFileFiltersActionTypes,
  documentFileFiltersActions,
  documentFileFiltersApi,
  authSelector
);
export const documentFileFiltersSelectors = createEntitySelectors(documentFileFiltersId);
