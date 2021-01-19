import { createApiActions } from 'utils/api/common';
import { createEntityActions } from 'utils/entity';

/**
 * @typedef { EntityAction } WriteAction
 * @property { FormModel } payload
 */

/**
 * @typedef { Object } WriteActions
 * @property { EntityActions } value
 * @property { ApiActions } write
 */

/**
 * @param { WriteActionTypes } actionTypes
 * @return { WriteActions }
 */
function createWriteActions(actionTypes) {
  return {
    value: createEntityActions(actionTypes.value),
    write: createApiActions(actionTypes.write)
  };
}

export default createWriteActions;
