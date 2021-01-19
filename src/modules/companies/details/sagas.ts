import { createReadSaga } from 'utils/api/read';
import { companyDetailsActionsTypes, companyDetailsActions } from './actions';
import { companyDetailsApi } from './api';

export const companyDetailsSaga = createReadSaga(
  companyDetailsActionsTypes,
  companyDetailsActions,
  companyDetailsApi);
