import { combineReducers } from 'redux';
import { organization } from './organization/reducer';
import { token } from './token/reducer';
import { user } from './user/reducer';

export const authReducer = combineReducers({ organization, token, user });
