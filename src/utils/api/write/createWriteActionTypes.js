import { createApiActionTypes } from 'utils/api/common';
import { createEntityActionTypes } from 'utils/entity';

/**
 * @typedef { Object } WriteActionTypes
 * @property { EntityActionTypes } value
 * @property { ApiActionTypes } write
 */

/**
 * @param { string } id
 * @return { WriteActionTypes }
 */

function createWriteActionTypes(id) {
  return {
    value: createEntityActionTypes(id),
    write: createApiActionTypes(`${id}/write`)
  };
}

export default createWriteActionTypes;
