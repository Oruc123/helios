import { userActionTypes } from './constants';

export const getUser = () => ({ type: userActionTypes.GET_USER_INFO });

export const setUser = payload => ({ payload, type: userActionTypes.SET_USER_INFO });
