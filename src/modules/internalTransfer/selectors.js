import { createEntitySelectors } from 'utils/entity';
import { INTERNAL_TRANSFER_STORE_KEY } from './reducers';

export const internalTransferSelectors = createEntitySelectors(INTERNAL_TRANSFER_STORE_KEY);

export default state => {
  const entity = internalTransferSelectors.getEntity(state);
  const value = entity.getValue();

  return {
    isPending: entity.isPending(),
    details: Array.isArray(value) && value.length === 1 ? value[0] : {}
  };
};
