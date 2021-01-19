import { createWriteReducer } from 'utils/api/write';
import { createDeleteReducer } from 'utils/api/delete';
import { internalTransferWriteActionTypes, internalTransferDeleteActionTypes } from './constants';
import { InternalTransferFormModel } from './models';

export const internalTransferFormReducer = createWriteReducer(
  internalTransferWriteActionTypes,
  new InternalTransferFormModel());

export const internalTransferDeleteReducer = createDeleteReducer(
  internalTransferDeleteActionTypes,
  new InternalTransferFormModel());
