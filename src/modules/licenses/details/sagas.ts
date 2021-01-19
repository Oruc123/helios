import { createReadSaga } from 'utils/api/read';
import { licenseDetailsActionsTypes, licenseDetailsActions } from './actions';
import { licenseDetailsApi } from './api';

export const licenseDetailsSaga = createReadSaga(
  licenseDetailsActionsTypes,
  licenseDetailsActions,
  licenseDetailsApi);
