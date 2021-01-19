import { createAction, createPayloadAction } from 'utils/redux';

/**
 * @typedef { PayloadAction } ApiAction
 * @property { Partial<AxiosRequestConfig> } payload
 */

/**
 * @typedef { ActionCreator<ApiAction> } ApiActionCreator
 */

/**
 * @typedef { Object } ApiActions
 * @property { ActionCreator } abort
 * @property { ActionCreator } aborted
 * @property { ApiActionCreator } call
 * @property { PayloadActionCreator } completed
 * @property { PayloadActionCreator } failed
 */

/**
 * @param { ApiActionTypes } actionTypes
 * @return { ApiActions }
 */
function createApiActions(actionTypes) {
  return {
    abort: createAction(actionTypes.abort),
    aborted: createAction(actionTypes.aborted),
    call: createPayloadAction(actionTypes.call),
    completed: createPayloadAction(actionTypes.completed),
    failed: createPayloadAction(actionTypes.failed)
  };
}

export default createApiActions;
