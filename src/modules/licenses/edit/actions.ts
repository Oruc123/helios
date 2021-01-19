import { createWriteActions } from 'utils/api/write';
import { createDeleteActions } from 'utils/api/delete';
import { licenseWriteActionTypes, licenseDeleteActionTypes } from './constants';

export const licenseWriteActions = createWriteActions(licenseWriteActionTypes);
export const licenseDeleteActions = createDeleteActions(licenseDeleteActionTypes);
