import { createWriteActionTypes } from 'utils/api/write';
import { createDeleteActionTypes } from 'utils/api/delete';

export const manageLicensePath = '/main/licenses/edit';

export const licenseFormId = 'licenses.edit';
export const licenseDeletionId = 'licenses.deletion';

export const licenseWriteActionTypes = createWriteActionTypes(licenseFormId);
export const licenseDeleteActionTypes = createDeleteActionTypes(licenseFormId);
