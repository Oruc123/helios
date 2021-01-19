import { combineReducers } from 'redux';
import { createReadReducer } from 'utils/api/read';
import { companyDetailsReducer } from 'modules/companies/details';
import { licenseDetailsActionsTypes } from './actions';

const reducer = createReadReducer(licenseDetailsActionsTypes);

export const licenseDetailsReducer = combineReducers({
  details: reducer,
  company: companyDetailsReducer,
});
