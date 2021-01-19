import { createReadActions, createReadActionTypes } from 'utils/api/read';
import { COMPANY_DETAILS_ID } from './constants';

export const companyDetailsActionsTypes = createReadActionTypes(COMPANY_DETAILS_ID);
export const companyDetailsActions = createReadActions(companyDetailsActionsTypes);
