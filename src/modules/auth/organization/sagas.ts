import { takeLatest, call, put } from 'redux-saga/effects';
import { organizationActionTypes } from './constants';
import { getOrganization } from './effects';
import { setOrganization } from './actions';

function* organizationHandler() {
  try {
    const response = yield call(getOrganization);
    yield put(setOrganization(response));
  } catch (error) {
    console.log('Error getting organization:', error);
  }
}

export function* organizationSaga() {
  yield takeLatest(organizationActionTypes.GET_ORGANIZATION, organizationHandler);
}
