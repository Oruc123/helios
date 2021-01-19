import { createListSelectors } from 'utils/list';
import { createEntitySelectors } from 'utils/entity';
import { DOCUMENTS_LIST_ID, DOCUMENTS_FILTER_ID } from './constants';

export const documentsListSelectors = createListSelectors(DOCUMENTS_LIST_ID);
export const documentsFilterSelectors = createEntitySelectors(DOCUMENTS_FILTER_ID);
