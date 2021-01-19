import { call, put, takeEvery } from 'redux-saga/effects';

import { loadConfigFailureAction, loadConfigSuccessAction } from './config-actions';
import { CONFIG_LOAD, CONFIG_LOAD_SUCCESS } from './config-constants';
import { configureApi, configureLogRocket, configureRollbar, configureZendesk, loadConfig } from './saga-effects';

export function* loadConfigSaga({ payload: configURL }) {
  try {
    const config = yield call(loadConfig, configURL);

    yield put(loadConfigSuccessAction(config));
  } catch (error) {
    yield put(loadConfigFailureAction(error));
  }
}

export function* loadConfigSuccessSaga({ payload: config }) {
  const { logRocket, zendesk } = config;

  yield call(configureApi, config);
  yield call(configureRollbar, config);

  if (logRocket) {
    yield call(configureLogRocket, config);
  }

  if (zendesk) {
    yield call(configureZendesk, config);
  }
}

export function* configSaga() {
  yield takeEvery(CONFIG_LOAD, loadConfigSaga);
  yield takeEvery(CONFIG_LOAD_SUCCESS, loadConfigSuccessSaga);
}
