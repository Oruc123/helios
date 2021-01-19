import { createApiReducer } from 'utils/api/common';
import { createEntityReducer } from 'utils/entity';

/**
 * @param { WriteActionTypes } actionTypes
 * @param { FormModel } initialState
 * @return { Function }
 */
function createWriteReducer(actionTypes, initialState) {
  const entityReducer = createEntityReducer(actionTypes.value, initialState);
  const apiReducer = createApiReducer(actionTypes.write, initialState);

  /**
   * @param { FormModel } state
   * @param { Action | PayloadAction } action
   * @return { FormModel }
   */
  return function writeReducer(state = initialState, action) {
    switch (action.type) {
      case actionTypes.write.completed:
        return apiReducer(state.setValue(action.payload), action);
      default:
        return apiReducer(entityReducer(state, action), action);
    }
  };
}

export default createWriteReducer;
