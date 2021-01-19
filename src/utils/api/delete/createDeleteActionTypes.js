import { createApiActionTypes } from 'utils/api/common';
import { createEntityActionTypes } from 'utils/entity';

/**
 * @typedef { Object } DeleteActionTypes
 * @property { EntityActionTypes } value
 * @property { ApiActionTypes } delete
 */

/**
 * @param { string } id
 * @return { DeleteActionTypes }
 */

function createDeleteActionTypes(id) {
  return {
    value: createEntityActionTypes(id),
    delete: createApiActionTypes(`${id}/delete`)
  };
}

export default createDeleteActionTypes;
