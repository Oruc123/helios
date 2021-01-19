import { createReadReducer } from 'utils/api/read';
import { createWriteReducer } from 'utils/api/write';
import { documentsListActionTypes, documentsFilterActionTypes } from './actions';
import { DocumentsFilterModel } from './models';

export const documentsListReducer = createReadReducer(documentsListActionTypes);

export const documentsFilterReducer =
  createWriteReducer(documentsFilterActionTypes, new DocumentsFilterModel());
