import { CONFIG_LOAD, CONFIG_LOAD_FAILURE, CONFIG_LOAD_SUCCESS } from 'modules/config/config-constants';

export const loadConfigAction = configURL => ({ type: CONFIG_LOAD, payload: configURL });

export const loadConfigSuccessAction = config => ({ type: CONFIG_LOAD_SUCCESS, payload: config });

export const loadConfigFailureAction = error => ({ type: CONFIG_LOAD_FAILURE, payload: error });
