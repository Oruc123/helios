import { createWriteSaga } from 'utils/api/write';
import { createDeleteSaga } from 'utils/api/delete';
import { takeLatest, put, spawn, call, select } from 'redux-saga/effects';
import { push } from 'modules/router/effects';
import { MAIN_RELATIONSHIPS_PATH } from 'modules/main/main-constants';
import { companyDetailsActions } from 'modules/companies/details';
import { CompanyFormModel } from 'components/CompanyForm';
import { licenseDetailsActionsTypes } from 'modules/licenses/details';
import { licenseWriteActionTypes, licenseDeleteActionTypes } from './constants';
import { licenseWriteActions, licenseDeleteActions } from './actions';
import { licenseWriteApi, licenseDeleteApi } from './api';
import { licenseFormSelector } from './selectors';

/**
 * Form initialization.
 */

function* formInitializeHandler(action) {
  const internalTransferForm = yield select(licenseFormSelector.getEntity);

  if (action.payload.records.length === 1) {
    const value = action.payload.records[0];
    const form = internalTransferForm.setValue(value).setInitialValue(value).ready();
    yield put(licenseWriteActions.value.set(form));
  }
}

/**
 * Set initial form state, when license fetch is completed.
 */

function* licenseFormSaga() {
  yield takeLatest(licenseDetailsActionsTypes.read.completed, formInitializeHandler);
}

/**
 * Update internal transfer.
 */

function* saveCompletedHandler() {
  const form = yield select(licenseFormSelector.getEntity);
  const value = form.getValue();
  yield call(push, `/main/licenses/info/${value.company_id}/${value.id}`);
}

/**
 * Listen "saved" event and redirect to details page.
 */

export function* licenseUpdateSaga() {
  yield spawn(createWriteSaga(licenseWriteActionTypes, licenseWriteActions, licenseWriteApi));
  yield takeLatest(licenseWriteActionTypes.write.completed, saveCompletedHandler);
}

/**
 * Internal transfer deletion.
 */

function* deleteCompletedHandler() {
  const form = yield select(licenseFormSelector.getEntity);
  const value = form.getValue();
  yield put(companyDetailsActions.read.call(
    new CompanyFormModel().setValue({ id: value.company_id })));
  yield call(push, `${MAIN_RELATIONSHIPS_PATH}/detail/${value.company_id}`);
}

function* licenseDeletionSaga() {
  yield spawn(createDeleteSaga(licenseDeleteActionTypes, licenseDeleteActions, licenseDeleteApi));
  yield takeLatest(licenseDeleteActionTypes.delete.completed, deleteCompletedHandler);
}

/**
 * Main saga.
 */

export function* manageLicenseSaga() {
  yield spawn(licenseFormSaga);
  yield spawn(licenseUpdateSaga);
  yield spawn(licenseDeletionSaga);
}
