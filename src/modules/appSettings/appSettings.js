import { AppSettingsModel } from 'components/AppSettings';
import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { MAIN_PATH } from 'modules/main/main-constants';
import { put, select, takeEvery } from 'redux-saga/effects';
import {
  createWriteActions,
  createWriteActionTypes,
  createWriteApi,
  createWriteReducer,
  createWriteSaga
} from 'utils/api';
import { createEntitySelectors } from 'utils/entity';
import { appSettingsListActionTypes, appSettingsListSelectors } from './appSettingsList';

export const appSettingsId = 'appSettings.edit';
export const appSettingsApiUrl = '/organization-setting';
export const appSettingsPath = `${MAIN_PATH}/app-settings`;
export const appSettingsSelectors = createEntitySelectors(appSettingsId);
export const appSettingsActionTypes = createWriteActionTypes(appSettingsId);
export const appSettingsActions = createWriteActions(appSettingsActionTypes);
export const appSettingsApi = createWriteApi(api, { url: appSettingsApiUrl });
export const appSettingsReducer = createWriteReducer(appSettingsActionTypes, new AppSettingsModel());

/**
 * @param { WriteActionTypes } actionTypes
 * @param { WriteActions } actions
 * @param { WriteApi } api
 * @param { function } authSelector
 */
function createAppSettingsSaga(actionTypes, actions, api, authSelector) {
  const writeAppSettingsSaga = createWriteSaga(actionTypes, actions, api, authSelector);

  function* readListCompletedSaga() {
    const appSettings = yield select(appSettingsSelectors.getEntity);
    const appSettingsList = yield select(appSettingsListSelectors.getEntity);
    const value = appSettingsList.getValue()[0];
    yield put(actions.value.set(appSettings.setValue(value).setInitialValue(value)));
  }

  function* writeCompletedSaga() {
    const appSettings = yield select(appSettingsSelectors.getEntity);

    yield put(actions.value.set(appSettings.setInitialValue(appSettings.getValue())));
  }

  return function* appSettingsSaga() {
    yield* writeAppSettingsSaga();
    yield takeEvery(appSettingsListActionTypes.read.completed, readListCompletedSaga);
    yield takeEvery(appSettingsActionTypes.write.completed, writeCompletedSaga);
  };
}

export const appSettingsSaga = createAppSettingsSaga(
  appSettingsActionTypes,
  appSettingsActions,
  appSettingsApi,
  authSelector
);
