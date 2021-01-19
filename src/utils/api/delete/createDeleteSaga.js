import { createApiSaga } from 'utils/api/common';

/**
 * @param { DeleteActionTypes } actionTypes
 * @param { DeleteActions } actions
 * @param { Api } api
 * @param { ...function } selectors
 * @return { Saga }
 */
function createDeleteSaga(actionTypes, actions, api, ...selectors) {
  /**
   * @param { Action } action
   */
  return createApiSaga(actionTypes.delete, actions.delete, api, ...selectors);
}

export default createDeleteSaga;
