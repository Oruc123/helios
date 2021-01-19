/**
 * @typedef { Object } EntitySelectors
 * @property { function(state: Object): EntityModel } getEntity
 * @property { function(state: Object): * } getValue
 * @property { function(state: Object): boolean } isPending
 */

/**
 * @param { string } id
 * @return { EntitySelectors }
 */
export const createEntitySelectors = (id: string) => {
  const pathParts = id.split('.');

  const getEntity = (state) => pathParts.reduce((accumulator, current) => accumulator[current], state);

  const getValue = state => getEntity(state).getValue();

  const isPending = state => getEntity(state).isPending();

  return { getEntity, getValue, isPending };
};
