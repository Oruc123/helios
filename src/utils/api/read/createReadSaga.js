import { createApiSaga } from 'utils/api/common';

/**
 * @param { ReadActionTypes } actionTypes
 * @param { ReadActions } actions
 * @param { Api } api
 * @param { ...function } selectors
 * @return { Saga }
 */
function createReadSaga(actionTypes, actions, api, ...selectors) {
  /**
   * @param { Action } action
   */
  return createApiSaga(actionTypes.read, actions.read, api, ...selectors);
}

export default createReadSaga;
