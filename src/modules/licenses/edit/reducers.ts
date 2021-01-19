import { createWriteReducer } from 'utils/api/write';
import { createDeleteReducer } from 'utils/api/delete';
import { licenseWriteActionTypes, licenseDeleteActionTypes } from './constants';
import { LicenseFormModel } from './models';

export const licenseFormReducer =
  createWriteReducer(licenseWriteActionTypes, new LicenseFormModel());

export const licenseDeleteReducer = createDeleteReducer(
  licenseDeleteActionTypes,
  new LicenseFormModel());
