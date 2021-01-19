import { createListSelectors } from 'utils/list';
import { LICENSE_DETAILS_ID } from './constants';

export const licenseDetailsSelector = createListSelectors(`${LICENSE_DETAILS_ID}`);
