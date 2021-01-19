import { createAction, createPayloadAction } from 'utils/redux';

/**
 * @typedef { PayloadAction } EntityAction
 * @property { EntityModel } payload
 */

/**
 * @typedef { ActionCreator<EntityAction> } EntityActionCreator
 */

/**
 * @typedef { Object } EntityActions
 * @property { ActionCreator } reset
 * @property { EntityActionCreator } set
 * @property { ActionCreator } validate
 */

/**
 * @param { EntityActionTypes } actionTypes
 * @return { EntityActions }
 */
function createEntityActions(actionTypes) {
  return {
    reset: createAction(actionTypes.reset),
    set: createPayloadAction(actionTypes.set),
    validate: createAction(actionTypes.validate),
    toggle: createAction(actionTypes.toggle)
  };
}

export default createEntityActions;
