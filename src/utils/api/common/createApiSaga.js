import { select, takeEvery } from 'redux-saga/effects';
import { abortApi, callApi } from './utils';

/**
 * @param { ApiActionTypes } actionTypes
 * @param { ApiActions } actions
 * @param { Api } api
 * @param { ...function } selectors
 */
function createApiSaga(actionTypes, actions, api, ...selectors) {
  function* abortApiSaga() {
    yield* abortApi(api);
  }

  function* callApiSaga(action) {
    const args = [];

    for (let i = 0; i < selectors.length; i += 1) {
      args.push(yield select(selectors[i]));
    }

    yield* callApi(actions, api, action.payload, ...args);
  }

  /**
   * @return { IterableIterator }
   */
  return function* apiSaga() {
    yield takeEvery(actionTypes.abort, abortApiSaga);
    yield takeEvery(actionTypes.call, callApiSaga);
  };
}

export default createApiSaga;
