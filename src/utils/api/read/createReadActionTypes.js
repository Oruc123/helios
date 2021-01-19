import { createApiActionTypes } from 'utils/api/common';
import { createEntityActionTypes } from 'utils/entity';

/**
 * @typedef { Object } ReadActionTypes
 * @property { EntityActionTypes } value
 * @property { ApiActionTypes } read
 */

/**
 * @param { string } id
 * @return { ReadActionTypes }
 */

function createReadActionTypes(id) {
  return {
    value: createEntityActionTypes(id),
    read: createApiActionTypes(`${id}/read`)
  };
}

export default createReadActionTypes;
