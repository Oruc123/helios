import { takeLatest, call, put, select } from 'redux-saga/effects';
import { companyListActions } from 'modules/companies/list';
import { licenseListActions } from 'modules/licenses/list';
import { companyFiltersSelectors } from 'modules/companies/filters';
import { FormModel } from 'utils/form';
import { userActionTypes } from './constants';
import { getUser } from './effects';
import { setUser } from './actions';
import { getOrganization } from '../organization/actions';
import { logout } from '../logout/actions';

const EmptyModel = FormModel.Factory({});

function* userHandler() {
  try {
    const companyFilters = yield select(companyFiltersSelectors.getEntity);
    const response = yield call(getUser);
    yield put(setUser(response));
    yield put(getOrganization());
    yield put(companyListActions.read.call(companyFilters));
    yield put(licenseListActions.read.call(new EmptyModel()));
  } catch (error) {
    yield put(logout());
  }
}

export function* userSaga() {
  yield takeLatest(userActionTypes.GET_USER_INFO, userHandler);
}
