import { createWriteActions } from 'utils/api/write';
import { createDeleteActions } from 'utils/api/delete';
import { internalTransferWriteActionTypes, internalTransferDeleteActionTypes } from './constants';

export const internalTransferWriteActions = createWriteActions(internalTransferWriteActionTypes);
export const internalTransferDeleteActions = createDeleteActions(internalTransferDeleteActionTypes);
