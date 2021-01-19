import { TransfersFilterModel } from 'components/Transfers';
import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { history } from 'modules/router';
import { transfersListActions, transfersListPath, transfersListApiUrl } from 'modules/transfersList';
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
function createtransfersFiltersSaga(actionTypes, actions, api, authSelector) {
  const writeSaga = createWriteSaga(actionTypes, actions, api, authSelector);

  function* writeCompletedSaga() {
    yield put(transfersListActions.read.call());
    yield call(history.push, transfersListPath);
  }

  return function* transfersWriteSaga() {
    yield* writeSaga();
    yield takeEvery(actionTypes.write.completed, writeCompletedSaga);
  };
}

export const transfersFiltersId = 'internalTransfers.filters';
export const transfersFiltersActionTypes = createWriteActionTypes(transfersFiltersId);
export const transfersFiltersActions = createWriteActions(transfersFiltersActionTypes);
export const transfersFiltersApi = createWriteApi(api, { url: transfersListApiUrl });
export const transfersFiltersReducer = createWriteReducer(transfersFiltersActionTypes, new TransfersFilterModel());
export const transfersFiltersSaga = createtransfersFiltersSaga(
  transfersFiltersActionTypes,
  transfersFiltersActions,
  transfersFiltersApi,
  authSelector
);
export const transfersFiltersSelectors = createEntitySelectors(transfersFiltersId);
