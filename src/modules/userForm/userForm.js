import { UserFormModel } from 'components/UserForm';
import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { history } from 'modules/router';
import { userListActions, userListPath } from 'modules/userList';
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
function createUserFormSaga(actionTypes, actions, api, authSelector) {
  const writeSaga = createWriteSaga(actionTypes, actions, api, authSelector);

  function* writeCompletedSaga() {
    yield put(userListActions.read.call());
    yield call(history.push, userListPath);
  }

  return function* userWriteSaga() {
    yield* writeSaga();
    yield takeEvery(actionTypes.write.completed, writeCompletedSaga);
  };
}

export const userFormId = 'users.edit';
export const userFormApiUrl = '/user';
export const userFormActionTypes = createWriteActionTypes(userFormId);
export const userFormActions = createWriteActions(userFormActionTypes);
export const userFormApi = createWriteApi(api, { url: userFormApiUrl });
export const userFormReducer = createWriteReducer(userFormActionTypes, new UserFormModel());
export const userFormSaga = createUserFormSaga(userFormActionTypes, userFormActions, userFormApi, authSelector);
export const userFormSelectors = createEntitySelectors(userFormId);
