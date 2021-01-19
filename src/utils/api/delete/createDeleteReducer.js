import { createApiReducer } from 'utils/api/common';
import { createEntityReducer } from 'utils/entity';
import { FormModel } from 'utils/form';

/**
 * @param { DeleteActionTypes } actionTypes
 * @param { FormModel } initialState
 * @return { Function }
 */
function createDeleteReducer(actionTypes, initialState = new FormModel()) {
  const entityReducer = createEntityReducer(actionTypes.value, initialState);
  const apiReducer = createApiReducer(actionTypes.delete, initialState);

  /**
   * @param { FormModel } state
   * @param { Action | PayloadAction } action
   * @return { FormModel }
   */
  return function deleteReducer(state = initialState, action) {
    switch (action.type) {
      case actionTypes.delete.completed:
        return apiReducer(state.resetValue(), action);
      default:
        return apiReducer(entityReducer(state, action), action);
    }
  };
}

export default createDeleteReducer;
