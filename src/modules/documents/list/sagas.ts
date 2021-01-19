import { createReadSaga } from 'utils/api/read';
import { documentsListActionTypes, documentsListActions } from './actions';
import { documentsListApi } from './api';

export const documentsListSaga = createReadSaga(
  documentsListActionTypes,
  documentsListActions,
  documentsListApi);
