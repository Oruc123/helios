import createAction from './createAction';

/**
 * @typedef { AnyAction } PayloadAction
 * @property { * } payload
 */

/**
 * @typedef { ActionCreator<PayloadAction> } PayloadActionCreator
 */

/**
 *
 * @param { string } actionType
 * @param { ...string } props
 * @return { ActionCreator<PayloadAction> }
 */
function createPayloadAction(actionType, ...props) {
  return createAction(actionType, 'payload', ...props);
}

export default createPayloadAction;
