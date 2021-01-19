import { call, put } from 'redux-saga/effects';

/**
 * @param { Api } api
 * @return { IterableIterator }
 */
export function* abortApi(api) {
  yield call(api.abort);
}

/**
 * @param { Api } api
 * @param { ApiActions } actions
 * @param { Partial<AxiosRequestConfig> } payload
 * @param { *[] } args
 * @return { IterableIterator }
 */
export function* callApi(actions, api, payload, ...args) {
  try {
    const value = yield call(api.call, payload, ...args);
    yield put(actions.completed(value));
  } catch (error) {
    yield put(error == null ? actions.aborted() : actions.failed(error));
  }
}
