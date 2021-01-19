import { createApiSaga } from 'utils/api/common';

/**
 * @param { WriteActionTypes } actionTypes
 * @param { WriteActions } actions
 * @param { Api } api
 * @param { ...function } selectors
 * @return { Saga }
 */
function createWriteSaga(actionTypes, actions, api, ...selectors) {
  /**
   * @param { Action } action
   */
  return createApiSaga(actionTypes.write, actions.write, api, ...selectors);
}

export default createWriteSaga;
