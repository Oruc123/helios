import { createWriteActionTypes } from 'utils/api/write';
import { createDeleteActionTypes } from 'utils/api/delete';
import { MAIN_PATH } from 'modules/main';

export const INTERNAL_TRANSFER_EDIT_PATH = `${MAIN_PATH}/internal-transfers/edit`;

export const internalTransferFormId = 'internalTransfers.edit';
export const internalTransferDeletionId = 'internalTransfers.deletion';

export const internalTransferWriteActionTypes = createWriteActionTypes(internalTransferFormId);
export const internalTransferDeleteActionTypes = createDeleteActionTypes(internalTransferFormId);
