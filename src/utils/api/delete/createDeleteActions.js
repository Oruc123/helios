import { createApiActions } from 'utils/api/common';
import { createEntityActions } from 'utils/entity';

/**
 * @typedef { EntityAction } DeleteAction
 * @property { FormModel } payload
 */

/**
 * @typedef { Object } DeleteActions
 * @property { EntityActions } value
 * @property { ApiActions } delete
 */

/**
 * @param { DeleteActionTypes } actionTypes
 * @return { DeleteActions }
 */
function createDeleteActions(actionTypes) {
  return {
    value: createEntityActions(actionTypes.value),
    delete: createApiActions(actionTypes.delete)
  };
}

export default createDeleteActions;
