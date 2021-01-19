import { createApiReducer } from 'utils/api/common';
import { createEntityReducer } from 'utils/entity';
import { ListModel } from 'utils/list';

// const mergeValue = (value, data) => value.merge(data.map(entity => [entity.id, entity]));

/**
 * @param { ReadActionTypes } actionTypes
 * @param { ListModel } initialState
 * @return { Function }
 */
function createReadReducer(actionTypes, initialState = new ListModel()) {
  const entityReducer = createEntityReducer(actionTypes.value, initialState);
  const apiReducer = createApiReducer(actionTypes.read, initialState);

  /**
   * @param { ListModel } state
   * @param { Action | PayloadAction } action
   * @return { ListModel }
   */
  return function readReducer(state = initialState, action) {
    switch (action.type) {
      case actionTypes.read.completed:
        // return apiReducer(state.setValue(mergeValue(state.getValue(), action.payload.records)), action);
        return apiReducer(state.setValue(action.payload.records), action);
      default:
        return apiReducer(entityReducer(state, action), action);
    }
  };
}

export default createReadReducer;
