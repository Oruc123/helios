import { createReducer } from 'utils/redux';
import ConfigModel from './model/config-model';
import { CONFIG_LOAD, CONFIG_LOAD_FAILURE, CONFIG_LOAD_SUCCESS } from './config-constants';

/**
 * @typedef { Object } ConfigState
 * @property { ?ConfigModel } data
 * @property { ?* } error
 * @property { boolean } loading
 */

/**
 * @type { ConfigState }
 */
export const initialConfigState = {
  data: null,
  error: null,
  loading: false
};

/**
 * @param { ConfigState } state
 * @param { { type: string, payload: * } } action
 *
 * @return { ConfigState }
 */
export const configReducer = createReducer({
  initialState: initialConfigState,
  actions: {
    [CONFIG_LOAD]: state => ({ ...state, loading: true, error: null }),
    [CONFIG_LOAD_SUCCESS]: (state, payload) => {
      if (!ConfigModel.isConfig(payload)) {
        throw new TypeError(`configReducer#${CONFIG_LOAD_SUCCESS}: instance of Config expected`);
      }

      return { ...state, loading: false, data: payload };
    },
    [CONFIG_LOAD_FAILURE]: (state, payload) => ({ ...state, loading: false, error: payload })
  }
});
