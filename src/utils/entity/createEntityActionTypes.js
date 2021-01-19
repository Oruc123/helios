/**
 * @typedef { Object } EntityActionTypes
 * @property { string } reset
 * @property { string } set
 * @property { string } validate
 */

/**
 * @param { string } id
 * @return { EntityActionTypes }
 */

function createEntityActionTypes(id) {
  return {
    reset: `${id}/reset`,
    set: `${id}/set`,
    validate: `${id}/validate`,
    toggle: `${id}/toggle`
  };
}

export default createEntityActionTypes;
