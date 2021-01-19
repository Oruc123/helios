import { DocumentsDueFilterModel } from 'components/DocumentsDue';
import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { history } from 'modules/router';
import { documentsDueListActions, documentsDueListPath, documentsDueListApiUrl } from 'modules/documentsDueList';
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
function createdocumentsDueFiltersSaga(actionTypes, actions, api, authSelector) {
  const writeSaga = createWriteSaga(actionTypes, actions, api, authSelector);

  function* writeCompletedSaga() {
    yield put(documentsDueListActions.read.call());
    yield call(history.push, documentsDueListPath);
  }

  return function* transfersWriteSaga() {
    yield* writeSaga();
    yield takeEvery(actionTypes.write.completed, writeCompletedSaga);
  };
}

export const documentsDueFiltersId = 'documentsDue.filters';
export const documentsDueFiltersActionTypes = createWriteActionTypes(documentsDueFiltersId);
export const documentsDueFiltersActions = createWriteActions(documentsDueFiltersActionTypes);
export const documentsDueFiltersApi = createWriteApi(api, { url: documentsDueListApiUrl });
export const documentsDueFiltersReducer = createWriteReducer(
  documentsDueFiltersActionTypes,
  new DocumentsDueFilterModel()
);
export const documentsDueFiltersSaga = createdocumentsDueFiltersSaga(
  documentsDueFiltersActionTypes,
  documentsDueFiltersActions,
  documentsDueFiltersApi,
  authSelector
);
export const documentsDueFiltersSelectors = createEntitySelectors(documentsDueFiltersId);
