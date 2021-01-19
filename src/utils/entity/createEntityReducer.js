import { EntityModel } from './EntityModel';

/**
 * @param { EntityActionTypes } actionTypes
 * @param { EntityModel } initialState
 * @return { Function }
 */
function createEntityReducer(actionTypes, initialState = new EntityModel()) {
  /**
   * @param { EntityModel } state
   * @param { Action | EntityAction } action
   * @return { EntityModel }
   */
  return function entityReducer(state = initialState, action) {
    switch (action.type) {
      case actionTypes.reset:
        return state.resetValue();
      case actionTypes.set:
        return action.payload;
      case actionTypes.validate:
        return state.validate();
      case actionTypes.toggle:
        return state.switchToggle();
      default:
        return state;
    }
  };
}

export default createEntityReducer;
