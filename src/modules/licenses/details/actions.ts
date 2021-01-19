import { createReadActions, createReadActionTypes } from 'utils/api/read';
import { LICENSE_DETAILS_ID } from './constants';

export const licenseDetailsActionsTypes = createReadActionTypes(LICENSE_DETAILS_ID);
export const licenseDetailsActions = createReadActions(licenseDetailsActionsTypes);
