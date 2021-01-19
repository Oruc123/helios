import { createReadReducer } from 'utils/api/read';
import { internalTransferActionType } from './actions';

export const INTERNAL_TRANSFER_STORE_KEY = 'internalTransfer';
export const internalTransferReducer = createReadReducer(internalTransferActionType);
