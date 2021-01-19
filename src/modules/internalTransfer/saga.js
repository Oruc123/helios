import { createReadSaga } from 'utils/api/read';
import { authSelector } from 'modules/auth/selectors';
import { internalTransferActionType, internalTransferActions } from './actions';
import { internalTransferApi } from './api';

const internalTransferSaga = createReadSaga(
  internalTransferActionType,
  internalTransferActions,
  internalTransferApi,
  authSelector
);

export default internalTransferSaga;
