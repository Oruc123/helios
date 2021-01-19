import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { MAIN_ALERTS_PATH } from 'modules/main/main-constants';
import {
  createReadActions,
  createReadActionTypes,
  createReadApi,
  createReadReducer,
  createReadSaga
} from 'utils/api/read';
import { createListSelectors } from 'utils/list';

export const annualReviewListId = 'annualReview.list';
export const annualReviewListApiUrl = '/annual-review-list';
export const annualReviewListPath = MAIN_ALERTS_PATH;
export const annualReviewListPaths = {
  add: `${annualReviewListPath}/add`,
  edit: `${annualReviewListPath}/edit/:id`,
  delete: `${annualReviewListPath}/delete/:id`,
  detail: `${annualReviewListPath}/detail/:id`
};

export const annualReviewListActionTypes = createReadActionTypes(annualReviewListId);
export const annualReviewListActions = createReadActions(annualReviewListActionTypes);
export const annualReviewListApi = createReadApi(api, { url: annualReviewListApiUrl });
export const annualReviewListReducer = createReadReducer(annualReviewListActionTypes);
export const annualReviewListSaga = createReadSaga(
  annualReviewListActionTypes,
  annualReviewListActions,
  annualReviewListApi,
  authSelector
);
export const annualReviewListSelectors = createListSelectors(annualReviewListId);
