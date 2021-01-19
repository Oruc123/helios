import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { MAIN_PATH } from 'modules/main/main-constants';
import {
  createReadActions,
  createReadActionTypes,
  createReadApi,
  createReadReducer,
  createReadSaga
} from 'utils/api/read';
import { createListSelectors } from 'utils/list';

export const licenseListId = 'licenses.list';
export const licenseListApiUrl = '/license-list';
export const licenseListPath = `${MAIN_PATH}/licenses/info`;
export const licenseListActionTypes = createReadActionTypes(licenseListId);
export const licenseListActions = createReadActions(licenseListActionTypes);
export const licenseListApi = createReadApi(api, { url: licenseListApiUrl });
export const licenseListReducer = createReadReducer(licenseListActionTypes);
export const licenseListSaga = createReadSaga(licenseListActionTypes, licenseListActions, licenseListApi, authSelector);
export const licenseListSelectors = createListSelectors(licenseListId);
