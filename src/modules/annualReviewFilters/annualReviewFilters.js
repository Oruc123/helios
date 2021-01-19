import { AlertsReviewsFilterModel } from 'components/Alerts/AlertsReviewsFilterModel';
import { api } from 'modules/api';
import { authSelector } from 'modules/auth/selectors';
import { history } from 'modules/router';
import { annualReviewListActions, annualReviewListPath, annualReviewListApi } from 'modules/annualReviewList';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  createWriteActions,
  createWriteActionTypes,
  createWriteApi,
  createWriteReducer,
  createWriteSaga
} from 'utils/api';
import { createEntitySelectors } from 'utils/entity';

/**
 * @param { WriteActionTypes } actionTypes
 * @param { WriteActions } actions
 * @param { WriteApi } api
 * @param { function } authSelector
 */
function createannualReviewFiltersSaga(actionTypes, actions, api, authSelector) {
  const writeSaga = createWriteSaga(actionTypes, actions, api, authSelector);

  function* writeCompletedSaga() {
    yield put(annualReviewListActions.read.call());
    yield call(history.push, annualReviewListPath);
  }

  return function* transfersWriteSaga() {
    yield* writeSaga();
    yield takeEvery(actionTypes.write.completed, writeCompletedSaga);
  };
}

export const annualReviewFiltersId = 'annualReview.filters';
export const annualReviewFiltersActionTypes = createWriteActionTypes(annualReviewFiltersId);
export const annualReviewFiltersActions = createWriteActions(annualReviewFiltersActionTypes);
export const annualReviewFiltersApi = createWriteApi(api, { url: annualReviewListApi });
export const annualReviewFiltersReducer = createWriteReducer(
  annualReviewFiltersActionTypes,
  new AlertsReviewsFilterModel()
);
export const annualReviewFiltersSaga = createannualReviewFiltersSaga(
  annualReviewFiltersActionTypes,
  annualReviewFiltersActions,
  annualReviewFiltersApi,
  authSelector
);
export const annualReviewFiltersSelectors = createEntitySelectors(annualReviewFiltersId);
