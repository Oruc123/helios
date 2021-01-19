import { createReadActions, createReadActionTypes } from 'utils/api/read';

export const internalTransferActionTypeId = 'internalTransfers.item';
export const internalTransferActionType = createReadActionTypes(internalTransferActionTypeId);
export const internalTransferActions = createReadActions(internalTransferActionType);
