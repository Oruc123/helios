/**
 * @typedef { Object } ApiActionTypes
 * @property { string } call
 * @property { string } abort
 * @property { string } aborted,
 * @property { string } completed
 * @property { string } failed
 */

/**
 * @param { string } id
 * @return { ApiActionTypes }
 */

function createApiActionTypes(id) {
  return {
    abort: `${id}/abort`,
    aborted: `${id}/aborted`,
    call: `${id}/call`,
    completed: `${id}/completed`,
    failed: `${id}/failed`
  };
}

export default createApiActionTypes;
