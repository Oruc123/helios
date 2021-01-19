import { createEntitySelectors } from 'utils/entity';
import { licenseFormId, licenseDeletionId } from './constants';

export const licenseFormSelector = createEntitySelectors(licenseFormId);

export const licenseDeletionSelector = createEntitySelectors(licenseDeletionId);
