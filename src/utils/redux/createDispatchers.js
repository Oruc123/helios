import mapValues from 'lodash/mapValues';

/**
 * @param { Object<Action | ActionCreator<any>> } actions
 * @return { function(dispatch: function): function }
 */
function createDispatchers(actions) {
  return dispatch =>
    mapValues(actions, action => (...args) => dispatch(typeof action === 'function' ? action(...args) : action));
}

export default createDispatchers;
