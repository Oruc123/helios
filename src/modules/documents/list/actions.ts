import { createReadActionTypes, createReadActions } from 'utils/api/read';
import { createWriteActionTypes, createWriteActions } from 'utils/api/write';
import { DOCUMENTS_LIST_ID, DOCUMENTS_FILTER_ID } from './constants';

export const documentsListActionTypes = createReadActionTypes(DOCUMENTS_LIST_ID);
export const documentsFilterActionTypes = createWriteActionTypes(DOCUMENTS_FILTER_ID);
export const documentsListActions = createReadActions(documentsListActionTypes);
export const documentsFilterActions = createWriteActions(documentsFilterActionTypes);
