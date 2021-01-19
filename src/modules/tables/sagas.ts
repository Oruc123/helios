import { api } from 'modules/api';
import { takeEvery, all, put, call } from 'redux-saga/effects';
import { GET_TABLE_DATA, GET_TABLE_DATA_FAILURE, GET_TABLE_DATA_SUCCESS } from './constants';

function* tableDataFetcher(action) {
  const { path, dataSources } = action.payload;

  try {
    const keys = Object.keys(dataSources);
    const responses = yield all(keys.map((key) => {
      const source = dataSources[key];
      return call(api.post, source.url, source.payload);
    }));

    yield put({
      type: GET_TABLE_DATA_SUCCESS,
      payload: {
        path,
        dataSources: responses.reduce(
          (accumulator, current, index) => ({ ...accumulator, [keys[index]]: current.data }),
          {}),
      },
    });
  } catch (error) {
    yield put({
      type: GET_TABLE_DATA_FAILURE,
      payload: { path, error },
    });
  }
}

export function* tablesSaga() {
  yield takeEvery(GET_TABLE_DATA, tableDataFetcher);
}
