import zipObject from 'lodash/zipObject';

/**
 *
 * @param { string } actionType
 * @param { ...string } propNames
 * @return { Action<any> | ActionCreator<Action<any>> }
 */
function createAction(actionType, ...propNames) {
  return (...args) => ({ type: actionType, ...zipObject(propNames, propNames.map((prop, index) => args[index])) });
}

export default createAction;
