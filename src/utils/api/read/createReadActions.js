import { createApiActions } from 'utils/api/common';
import { createEntityActions } from 'utils/entity';

/**
 * @typedef { EntityAction } ReadAction
 * @property { FormModel } payload
 */

/**
 * @typedef { Object } ReadActions
 * @property { EntityActions } value
 * @property { ApiActions } read
 */

/**
 * @param { ReadActionTypes } actionTypes
 * @return { ReadActions }
 */
function createReadActions(actionTypes) {
  return {
    value: createEntityActions(actionTypes.value),
    read: createApiActions(actionTypes.read)
  };
}

export default createReadActions;
