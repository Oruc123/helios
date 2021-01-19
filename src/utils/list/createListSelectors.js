import { createSelector } from 'reselect';
import { createEntitySelectors } from 'utils/entity';

function createListSelectors(id) {
  const entitySelectors = createEntitySelectors(id);

  const getDataSource = createSelector(
    [entitySelectors.getValue],
    data => [...data.values()]
  );

  return {
    ...entitySelectors,
    getDataSource
  };
}

export default createListSelectors;
