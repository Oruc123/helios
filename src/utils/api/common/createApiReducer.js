/**
 * @param { ApiActionTypes } actionTypes
 * @param { EntityModel } initialState
 * @return { function }
 */
function createApiReducer(actionTypes, initialState) {
  /**
   * @param { EntityModel } state
   * @param { Action | PayloadAction } action
   * @return { EntityModel }
   */
  return function apiReducer(state = initialState, action) {
    switch (action.type) {
      case actionTypes.call:
        return state.pending().setError(null);
      case actionTypes.abort:
        return state.ready();
      case actionTypes.completed:
        return state.ready();
      case actionTypes.failed:
        return state.ready().setError(action.payload);
      default:
        return state;
    }
  };
}

export default createApiReducer;
