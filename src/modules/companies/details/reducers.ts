import { createReadReducer } from 'utils/api/read';
import { companyDetailsActionsTypes } from './actions';

export const companyDetailsReducer = createReadReducer(companyDetailsActionsTypes);
